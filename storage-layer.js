(() => {
  "use strict";

  const ENVELOPE_KEY = "lifeos.english-structure-lab.storage.v1";
  const SCHEMA_VERSION = "1.0";
  const APP_ID = "english-structure-lab";
  const LEGACY_KEYS = {
    materials: "esl.materials.v1",
    prefs: "esl.prefs.v1",
    last: "esl.last.v1",
    draft: "esl.draft.v1"
  };

  const safeParse = (raw, fallback = null) => {
    try { return raw == null ? fallback : JSON.parse(raw); }
    catch { return fallback; }
  };

  function readLegacyBundle() {
    return {
      materials: safeParse(localStorage.getItem(LEGACY_KEYS.materials), []),
      prefs: safeParse(localStorage.getItem(LEGACY_KEYS.prefs), {}),
      last: safeParse(localStorage.getItem(LEGACY_KEYS.last), {}),
      draft: safeParse(localStorage.getItem(LEGACY_KEYS.draft), "")
    };
  }

  function hasLegacyData(bundle) {
    return Array.isArray(bundle.materials) && bundle.materials.length > 0 ||
      Object.keys(bundle.prefs || {}).length > 0 ||
      Object.keys(bundle.last || {}).length > 0 ||
      typeof bundle.draft === "string" && bundle.draft.length > 0;
  }

  function writeEnvelope(payload, source = "legacy-mirror") {
    const envelope = {
      schemaVersion: SCHEMA_VERSION,
      appId: APP_ID,
      updatedAt: new Date().toISOString(),
      source,
      payload
    };
    localStorage.setItem(ENVELOPE_KEY, JSON.stringify(envelope));
    return envelope;
  }

  function readEnvelope() {
    const parsed = safeParse(localStorage.getItem(ENVELOPE_KEY));
    if (!parsed || parsed.appId !== APP_ID || parsed.schemaVersion !== SCHEMA_VERSION || !parsed.payload) return null;
    return parsed;
  }

  function restoreLegacyFromEnvelope(envelope) {
    if (!envelope?.payload) return false;
    const p = envelope.payload;
    if (Array.isArray(p.materials)) localStorage.setItem(LEGACY_KEYS.materials, JSON.stringify(p.materials));
    if (p.prefs && typeof p.prefs === "object") localStorage.setItem(LEGACY_KEYS.prefs, JSON.stringify(p.prefs));
    if (p.last && typeof p.last === "object") localStorage.setItem(LEGACY_KEYS.last, JSON.stringify(p.last));
    if (typeof p.draft === "string") localStorage.setItem(LEGACY_KEYS.draft, JSON.stringify(p.draft));
    return true;
  }

  const originalSetItem = Storage.prototype.setItem;
  let syncing = false;

  Storage.prototype.setItem = function(key, value) {
    originalSetItem.call(this, key, value);
    if (this !== localStorage || syncing || !Object.values(LEGACY_KEYS).includes(key)) return;
    try {
      syncing = true;
      writeEnvelope(readLegacyBundle(), "legacy-live-mirror");
    } finally {
      syncing = false;
    }
  };

  try {
    const legacy = readLegacyBundle();
    const envelope = readEnvelope();
    if (hasLegacyData(legacy)) {
      writeEnvelope(legacy, envelope ? "legacy-refresh" : "legacy-initial-mirror");
    } else if (envelope) {
      restoreLegacyFromEnvelope(envelope);
    }
  } catch (error) {
    console.warn("LifeOS Storage Layer initialization failed:", error);
  }

  window.LifeOSStorage = {
    appId: APP_ID,
    schemaVersion: SCHEMA_VERSION,
    envelopeKey: ENVELOPE_KEY,
    legacyKeys: { ...LEGACY_KEYS },
    readEnvelope,
    readLegacyBundle,
    mirror: () => writeEnvelope(readLegacyBundle(), "manual-mirror"),
    restore: () => restoreLegacyFromEnvelope(readEnvelope())
  };
})();
