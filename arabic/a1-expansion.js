window.ARABIC_A1_EXPANSION=(function(){
const out=[];let n=151;
const add=(scene,emotion,intent,ar,en,ja)=>out.push([`a1e${String(n++).padStart(3,'0')}`,scene,emotion,intent,ar,en,ja]);
const people=[['عَلِيّ','Ali','アリー','🙂'],['مَرْيَم','Maryam','マリアム','👩'],['أَحْمَد','Ahmad','アフマド','👨'],['سَارَة','Sarah','サーラ','👩‍🦰'],['عُمَر','Omar','ウマル','🧑'],['لَيْلَى','Layla','ライラ','👧']];
const places=[['الْمَقْهَى','the cafe','カフェ','☕'],['الْمَدْرَسَة','the school','学校','🏫'],['الْمَحَطَّة','the station','駅','🚉'],['الْفُنْدُق','the hotel','ホテル','🏨'],['السُّوق','the market','市場','🛍️'],['الْمَطْعَم','the restaurant','レストラン','🍽️'],['الْمَكْتَبَة','the library','図書館','📚'],['الْمُسْتَشْفَى','the hospital','病院','🏥'],['الْحَدِيقَة','the park','公園','🌳'],['الْبَيْت','home','家','🏠']];
const foods=[['مَاءً','water','水','💧'],['قَهْوَةً','coffee','コーヒー','☕'],['شَايًا','tea','お茶','🍵'],['عَصِيرًا','juice','ジュース','🧃'],['خُبْزًا','bread','パン','🍞'],['جُبْنًا','cheese','チーズ','🧀'],['أَرُزًّا','rice','ご飯','🍚'],['تُفَّاحًا','apples','りんご','🍎'],['مَوْزًا','bananas','バナナ','🍌'],['حَلِيبًا','milk','牛乳','🥛']];
const objects=[['الْمِفْتَاح','the key','鍵','🔑'],['الْهَاتِف','the phone','電話','📱'],['الْكِتَاب','the book','本','📘'],['الْحَقِيبَة','the bag','かばん','🎒'],['الْقَلَم','the pen','ペン','🖊️'],['التَّذْكِرَة','the ticket','切符','🎫'],['الْمِحْفَظَة','the wallet','財布','👛'],['الْمِظَلَّة','the umbrella','傘','☂️'],['الْخَرِيطَة','the map','地図','🗺️'],['الْبَطَاقَة','the card','カード','💳']];
const colors=[['أَحْمَرُ','red','赤','🔴'],['أَزْرَقُ','blue','青','🔵'],['أَخْضَرُ','green','緑','🟢'],['أَسْوَدُ','black','黒','⚫'],['أَبْيَضُ','white','白','⚪']];
const times=[['الْآنَ','now','今','⏱️'],['صَبَاحًا','in the morning','朝に','🌅'],['مَسَاءً','in the evening','夕方に','🌆'],['الْيَوْمَ','today','今日','📅'],['غَدًا','tomorrow','明日','➡️📅']];
const moods=[['سَعِيدٌ','happy','うれしい','😊'],['تَعْبَانُ','tired','疲れている','😮‍💨'],['جَائِعٌ','hungry','お腹が空いている','😋'],['عَطْشَانُ','thirsty','喉が渇いている','🥵'],['مَرِيضٌ','sick','具合が悪い','🤒']];
// 1) People reappear: greetings and names — 30
for(let k=0;k<30;k++){const p=people[k%people.length],t=k%3; if(t===0)add(`${p[3]} → 👋`,'warmth','greet_person',`مَرْحَبًا يَا ${p[0]}.`,`Hello, ${p[1]}.`,`${p[2]}、こんにちは。`); else if(t===1)add(`${p[3]} → ❓ → 🙂`,'curiosity','ask_name_again',`مَا اسْمُكَ؟`,'What is your name?','お名前は何ですか？'); else add(`🙂 → 🗣️ → ${p[3]}`,'openness','introduce_person',`هَذَا ${p[0]}.`,`This is ${p[1]}.`,`こちらは${p[2]}です。`)}
// 2) Places: where / at — 30
for(let k=0;k<30;k++){const p=places[k%places.length];if(k%2===0)add(`${p[3]}❓ → 🔍`,'curiosity','ask_place',`أَيْنَ ${p[0]}؟`,`Where is ${p[1]}?`,`${p[2]}はどこですか？`);else add(`🙂 → ${p[3]}`,'calm','say_at_place',`أَنَا فِي ${p[0]}.`,`I am at ${p[1]}.`,`私は${p[2]}にいます。`)}
// 3) Food and drink: wants / choice / likes — 30
for(let k=0;k<30;k++){const f=foods[k%foods.length],m=k%3;if(m===0)add(`${f[3]}👀 → 🙂`,'desire','want_food',`أُرِيدُ ${f[0]}.`,`I want ${f[1]}.`,`${f[2]}が欲しいです。`);else if(m===1)add(`${f[3]} → 😋`,'pleasure','like_food',`أُحِبُّ ${f[0].replace(/ًا$|ً$/,'')}.`,`I like ${f[1]}.`,`${f[2]}が好きです。`);else{const g=foods[(k+1)%foods.length];add(`${f[3]} ↔️ ${g[3]} → ❓`,'choice','choose_food',`${f[0].replace(/ًا$|ً$/,'')} أَمْ ${g[0].replace(/ًا$|ً$/,'')}؟`,`${f[1]} or ${g[1]}?`,`${f[2]}、それとも${g[2]}？`)}}
// 4) Objects: where / possession / this — 30
for(let k=0;k<30;k++){const o=objects[k%objects.length],m=k%3;if(m===0)add(`${o[3]}❓ → 😕`,'concern','ask_object',`أَيْنَ ${o[0]}؟`,`Where is ${o[1]}?`,`${o[2]}はどこですか？`);else if(m===1)add(`🙂 → ${o[3]}`,'ownership','say_have',`عِنْدِي ${o[0]}.`,`I have ${o[1]}.`,`私は${o[2]}を持っています。`);else add(`${o[3]}👉 → 🙂`,'recognition','identify_object',`هَذَا ${o[0]}.`,`This is ${o[1]}.`,`これは${o[2]}です。`)}
// 5) Shopping: price / color / buy — 30
for(let k=0;k<30;k++){const o=objects[k%objects.length],c=colors[k%colors.length],m=k%3;if(m===0)add(`${o[3]}🏷️❓`,'practical need','ask_price',`كَمْ سِعْرُ ${o[0]}؟`,`How much is ${o[1]}?`,`${o[2]}はいくらですか？`);else if(m===1)add(`${o[3]} → ${c[3]}`,'attention','describe_color',`لَوْنُ ${o[0]} ${c[0]}.`,`The color of ${o[1]} is ${c[1]}.`,`${o[2]}の色は${c[2]}です。`);else add(`${o[3]} → 💳 → 🙂`,'decision','buy_object',`سَآخُذُ ${o[0]}.`,`I will take ${o[1]}.`,`${o[2]}にします。`)}
// 6) Time: now / morning / tomorrow — 30
for(let k=0;k<30;k++){const t=times[k%times.length],p=places[k%places.length];if(k%2===0)add(`${t[3]} → ⏰❓`,'curiosity','ask_time',`كَمِ السَّاعَةُ ${t[0]}؟`,`What time is it ${t[1]}?`,`${t[2]}何時ですか？`);else add(`${t[3]} → ${p[3]}`,'planning','time_place',`أَنَا فِي ${p[0]} ${t[0]}.`,`I am at ${p[1]} ${t[1]}.`,`${t[2]}${p[2]}にいます。`)}
// 7) Body state and wellbeing — 30
for(let k=0;k<30;k++){const m=moods[k%moods.length],p=people[k%people.length];if(k%2===0)add(`${m[3]} → 🗣️`,'body state','say_state',`أَنَا ${m[0]}.`,`I am ${m[1]}.`,`私は${m[2]}です。`);else add(`${p[3]}❓ → ❤️`,'care','ask_wellbeing_person',`كَيْفَ حَالُكَ يَا ${p[0]}؟`,`How are you, ${p[1]}?`,`${p[2]}、元気ですか？`)}
// 8) Family and relationships — 30
const family=[['أَبِي','my father','父','👨‍🦳'],['أُمِّي','my mother','母','👩‍🦳'],['أَخِي','my brother','兄弟','👦'],['أُخْتِي','my sister','姉妹','👧'],['صَدِيقِي','my friend','友達','🧑‍🤝‍🧑']];
for(let k=0;k<30;k++){const f=family[k%family.length],p=places[k%places.length];if(k%2===0)add(`${f[3]} → 🙂`,'warmth','introduce_family',`هَذَا ${f[0]}.`,`This is ${f[1]}.`,`こちらは私の${f[2]}です。`);else add(`${f[3]} → ${p[3]}`,'connection','family_location',`${f[0]} فِي ${p[0]}.`,`${f[1]} is at ${p[1]}.`,`私の${f[2]}は${p[2]}にいます。`)}
// 9) Directions — 30
const dirs=[['اِذْهَبْ مُسْتَقِيمًا','Go straight','まっすぐ行ってください','⬆️'],['اِنْعَطِفْ يَمِينًا','Turn right','右に曲がってください','↪️'],['اِنْعَطِفْ يَسَارًا','Turn left','左に曲がってください','↩️']];
for(let k=0;k<30;k++){const d=dirs[k%dirs.length],p=places[k%places.length];add(`${p[3]}❓ → 🚶 → ${d[3]}`,'helpfulness','give_direction',`${d[0]} إِلَى ${p[0]}.`,`${d[1]} toward ${p[1]}.`,`${p[2]}の方へ${d[2]}。`)}
// 10) Transport — 30
const transport=[['الْحَافِلَة','the bus','バス','🚌'],['الْقِطَار','the train','電車','🚆'],['سَيَّارَةِ الْأُجْرَة','the taxi','タクシー','🚕']];
for(let k=0;k<30;k++){const t=transport[k%transport.length],p=places[k%places.length];if(k%3===0)add(`${t[3]} → 🙂`,'calm','on_transport',`أَنَا فِي ${t[0]}.`,`I am on ${t[1]}.`,`私は${t[2]}に乗っています。`);else if(k%3===1)add(`${t[3]}❓ → ⏰`,'urgency','ask_transport',`أَيْنَ ${t[0]}؟`,`Where is ${t[1]}?`,`${t[2]}はどこですか？`);else add(`${t[3]} → ${p[3]}`,'planning','transport_destination',`${t[0]} إِلَى ${p[0]}.`,`${t[1]} goes to ${p[1]}.`,`${t[2]}は${p[2]}へ行きます。`)}
// 11) Polite requests — 30
for(let k=0;k<30;k++){const f=foods[k%foods.length],o=objects[k%objects.length],m=k%3;if(m===0)add(`🙏 → ${f[3]}`,'politeness','polite_food',`${f[0]}، مِنْ فَضْلِكَ.`,`${f[1]}, please.`,`${f[2]}をお願いします。`);else if(m===1)add(`🙏 → 🔁`,'clarification','repeat_request',`مَرَّةً أُخْرَى، مِنْ فَضْلِكَ.`,'Once again, please.','もう一度お願いします。');else add(`${o[3]} → 🙏`,'need','ask_for_object',`أُرِيدُ ${o[0]}، مِنْ فَضْلِكَ.`,`I would like ${o[1]}, please.`,`${o[2]}をお願いします。`)}
// 12) Understanding / communication repair — 30
const repair=[['لَا أَفْهَمُ.','I do not understand.','わかりません。','😕'],['تَكَلَّمْ بِبُطْءٍ، مِنْ فَضْلِكَ.','Speak slowly, please.','ゆっくり話してください。','🐢'],['مَاذَا يَعْنِي هَذَا؟','What does this mean?','これはどういう意味ですか？','❓'],['اُكْتُبْهُ، مِنْ فَضْلِكَ.','Write it, please.','書いてください。','✍️'],['نَعَمْ، فَهِمْتُ.','Yes, I understood.','はい、わかりました。','💡']];
for(let k=0;k<30;k++){const r=repair[k%repair.length];add(`🗣️ → ${r[3]} → 🙂`,'communication','repair_communication',r[0],r[1],r[2])}
// 13) Daily routine — 30
const routines=[['أَسْتَيْقِظُ','wake up','起きます','⏰'],['آكُلُ الْفُطُورَ','eat breakfast','朝食を食べます','🍳'],['أَذْهَبُ إِلَى الْعَمَلِ','go to work','仕事へ行きます','💼'],['أَدْرُسُ الْعَرَبِيَّةَ','study Arabic','アラビア語を勉強します','📖'],['أَنَامُ','sleep','寝ます','😴']];
for(let k=0;k<30;k++){const r=routines[k%routines.length],t=times[k%times.length];add(`${t[3]} → ${r[3]}`,'routine','daily_routine',`${r[0]} ${t[0]}.`,`I ${r[1]} ${t[1]}.`,`${t[2]}${r[2]}。`)}
// 14) Likes and dislikes — 30
const hobbies=[['الْمُوسِيقَى','music','音楽','🎵'],['الْقِرَاءَةَ','reading','読書','📚'],['الْمَشْيَ','walking','散歩','🚶'],['الطَّبْخَ','cooking','料理','🍳'],['السَّفَرَ','travel','旅行','✈️']];
for(let k=0;k<30;k++){const h=hobbies[k%hobbies.length];if(k%2===0)add(`${h[3]} → 😊`,'preference','like_hobby',`أُحِبُّ ${h[0]}.`,`I like ${h[1]}.`,`${h[2]}が好きです。`);else add(`${h[3]} → 😐`,'preference','not_like_hobby',`لَا أُحِبُّ ${h[0]}.`,`I do not like ${h[1]}.`,`${h[2]}は好きではありません。`)}
// 15) Weather — 30
const weather=[['الْجَوُّ حَارٌّ','The weather is hot','暑いです','☀️🥵'],['الْجَوُّ بَارِدٌ','The weather is cold','寒いです','❄️🥶'],['الْجَوُّ جَمِيلٌ','The weather is nice','いい天気です','🌤️🙂'],['هُنَاكَ مَطَرٌ','It is raining','雨です','🌧️'],['هُنَاكَ رِيَاحٌ','It is windy','風があります','💨']];
for(let k=0;k<30;k++){const w=weather[k%weather.length],t=times[k%times.length];add(`${t[3]} → ${w[3]}`,'environment','weather',`${w[0]} ${t[0]}.`,`${w[1]} ${t[1]}.`,`${t[2]}${w[2]}。`)}
// 16) Can / cannot — 30
const abilities=[['أَسْبَحَ','swim','泳ぐ','🏊'],['أَقْرَأَ الْعَرَبِيَّةَ','read Arabic','アラビア語を読む','📖'],['أَطْبُخَ','cook','料理する','🍳'],['أَقُودَ السَّيَّارَةَ','drive a car','車を運転する','🚗'],['أَتَكَلَّمَ قَلِيلًا','speak a little','少し話す','🗣️']];
for(let k=0;k<30;k++){const a=abilities[k%abilities.length];if(k%2===0)add(`${a[3]} → 🙂`,'ability','can_do',`أَسْتَطِيعُ أَنْ ${a[0]}.`,`I can ${a[1]}.`,`${a[2]}ことができます。`);else add(`${a[3]} → 😕`,'limitation','cannot_do',`لَا أَسْتَطِيعُ أَنْ ${a[0]}.`,`I cannot ${a[1]}.`,`${a[2]}ことができません。`)}
// 17) Simple plans — 30
for(let k=0;k<30;k++){const p=places[k%places.length],t=times[(k+1)%times.length];add(`📅 → ${p[3]} → 🙂`,'planning','future_plan',`سَأَذْهَبُ إِلَى ${p[0]} ${t[0]}.`,`I will go to ${p[1]} ${t[1]}.`,`${t[2]}${p[2]}へ行きます。`)}
// 18) Simple completed events, late-A1 exposure — 30
for(let k=0;k<30;k++){const p=places[k%places.length],m=k%3;if(m===0)add(`🚶 → ${p[3]} → ✅`,'completion','went_place',`ذَهَبْتُ إِلَى ${p[0]}.`,`I went to ${p[1]}.`,`${p[2]}へ行きました。`);else if(m===1)add(`🍽️ → ✅`,'completion','ate',`أَكَلْتُ فِي ${p[0]}.`,`I ate at ${p[1]}.`,`${p[2]}で食べました。`);else add(`👀 → ${p[3]} → 🙂`,'memory','saw_place',`رَأَيْتُ ${p[0]}.`,`I saw ${p[1]}.`,`${p[2]}を見ました。`)}
// 19) Small problems and help — 30
const problems=[['ضَاعَ مِفْتَاحِي','I lost my key','鍵をなくしました','🔑❓'],['هَاتِفِي لَا يَعْمَلُ','My phone does not work','電話が動きません','📱⚠️'],['أَنَا تَائِهٌ','I am lost','道に迷いました','🗺️😕'],['أَنَا مَرِيضٌ','I am sick','具合が悪いです','🤒'],['أَحْتَاجُ إِلَى مُسَاعَدَةٍ','I need help','助けが必要です','🆘']];
for(let k=0;k<30;k++){const p=problems[k%problems.length];add(`${p[3]} → 🙋`,'need','problem_help',`${p[0]}.`,p[1]+'.',p[2]+'。')}
// 20) Connected-world combinations — 30
for(let k=0;k<30;k++){const person=people[k%people.length],place=places[(k+3)%places.length],food=foods[(k+4)%foods.length],m=k%3;if(m===0)add(`${person[3]} → ${place[3]} → 👋`,'connection','meet_again',`أَلْتَقِي ${person[0]} فِي ${place[0]}.`,`I meet ${person[1]} at ${place[1]}.`,`${place[2]}で${person[2]}に会います。`);else if(m===1)add(`${person[3]} → ${food[3]} → 🙂`,'sharing','offer_food',`${person[0]} يُحِبُّ ${food[0].replace(/ًا$|ً$/,'')}.`,`${person[1]} likes ${food[1]}.`,`${person[2]}は${food[2]}が好きです。`);else add(`${person[3]} → ${place[3]} → 📅`,'planning','plan_with_person',`سَأَذْهَبُ مَعَ ${person[0]} إِلَى ${place[0]}.`,`I will go with ${person[1]} to ${place[1]}.`,`${person[2]}と${place[2]}へ行きます。`)}
return {schemaVersion:'2.1',course:'Arabic Structure Lab Living World',level:'A1',batch:'Expansion',experienceRange:'151-750',experienceCount:out.length,design:'re-encounter connected-world A1',experiences:out};
})();