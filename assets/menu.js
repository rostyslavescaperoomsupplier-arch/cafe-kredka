// Menu data, prices from cafekredka.pl (2026-10-29). img = file in assets/food/
window.KREDKA_MENU = {
  categories: [
    { id: "sniadania", name: "Kanapki i śniadania" },
    { id: "zupy", name: "Zupy" },
    { id: "obiady", name: "Drugie danie" },
    { id: "pierogi", name: "Pierogi" },
    { id: "nalesniki", name: "Naleśniki" },
    { id: "salatki", name: "Sałatki" },
    { id: "kawa", name: "Kawa" }
  ],
  items: [
    { id: "kanapka-pomidor", cat: "sniadania", name: "Kanapka z pomidorem", desc: "Bułka poznańska, masło, szynka z kurczaka, ser, sałata i pomidor.", price: 13 },
    { id: "kanapka-ogorek", cat: "sniadania", name: "Kanapka z ogórkiem", desc: "Masło, szynka z kurczaka, ser, sałata i świeży ogórek.", price: 13 },
    { id: "syrniki", cat: "sniadania", name: "Syrniki, 4 szt.", desc: "Twarogowe placuszki smażone na złoto, podane ze śmietaną.", price: 25, img: "syrniki" },
    { id: "jajka", cat: "sniadania", name: "Jajka sadzone z boczkiem", desc: "Chrupiący boczek, ogórek i pomidorki koktajlowe.", price: 20, img: "jajka-boczek" },

    { id: "barszcz", cat: "zupy", name: "Barszcz ukraiński ze śmietaną", desc: "Na bulionie drobiowym, z burakami, ziemniakami, kapustą i czosnkiem.", price: 13, img: "barszcz", popular: true },

    { id: "schab-pure", cat: "obiady", name: "Schabowy z purée i surówką", desc: "Kotlet w chrupiącej panierce, kremowe purée, surówka z buraków.", price: 33, img: "schabowy", popular: true },
    { id: "schab-ryz", cat: "obiady", name: "Schabowy z ryżem i surówką", desc: "Sypki ryż, kotlet schabowy i świeża surówka.", price: 33 },
    { id: "schab-makaron", cat: "obiady", name: "Schabowy z makaronem i surówką", desc: "Makaron al dente, kotlet schabowy i surówka z sezonowych warzyw.", price: 33 },
    { id: "schab-kasza", cat: "obiady", name: "Schabowy z kaszą gryczaną", desc: "Kasza gryczana, kotlet schabowy i surówka.", price: 33 },
    { id: "schab-kuskus", cat: "obiady", name: "Schabowy z kuskusem", desc: "Puszysty kuskus, kotlet schabowy i surówka.", price: 33 },
    { id: "mielony-pure", cat: "obiady", name: "Mielony z purée i surówką", desc: "Soczysty kotlet mielony, purée i surówka z warzyw.", price: 33, img: "mielony" },
    { id: "mielony-kasza", cat: "obiady", name: "Mielony z kaszą gryczaną", desc: "Kotlet mielony z wieprzowiny, kasza gryczana i surówka.", price: 33 },
    { id: "mielony-kuskus", cat: "obiady", name: "Mielony z kuskusem", desc: "Kotlet mielony, kuskus i surówka.", price: 33 },
    { id: "filet", cat: "obiady", name: "Filet drobiowy z surówką", desc: "Filet smażony w jajku. Do wyboru: purée, ryż, makaron, kasza lub kuskus.", price: 36.39, img: "filet" },
    { id: "golabki", cat: "obiady", name: "Gołąbki, 2 szt.", desc: "Kapusta z farszem mięsno-ryżowym, duszona w sosie pomidorowym.", price: 33 },
    { id: "gulasz", cat: "obiady", name: "Gulasz wieprzowy z surówką", desc: "W sosie pomidorowym z papryką. Do tego purée lub ziemniaki.", price: 33, img: "gulasz" },
    { id: "placki", cat: "obiady", name: "Placki ziemniaczane, 4 szt.", desc: "Złociste i chrupiące, podane ze śmietaną.", price: 19.5 },
    { id: "placki-wegier", cat: "obiady", name: "Placki po węgiersku, 4 szt.", desc: "Chrupiące placki z długo duszonym gulaszem mięsnym.", price: 33, img: "placki-wegierskie", popular: true },

    { id: "pierogi-wieprz-18", cat: "pierogi", name: "Z mięsem wieprzowym, 18 szt.", desc: "Ręcznie lepione, z cebulką i śmietaną.", price: 33.5, img: "pierogi" },
    { id: "pierogi-wieprz-36", cat: "pierogi", name: "Z mięsem wieprzowym, 36 szt.", desc: "Duża porcja dla dwojga lub na zapas. Z cebulką i śmietaną.", price: 64.5 },
    { id: "pierogi-kurczak", cat: "pierogi", name: "Z kurczakiem, 18 szt.", desc: "Farsz z przyprawionego mięsa z kurczaka, z cebulką i śmietaną.", price: 33 },
    { id: "pierogi-kapusta", cat: "pierogi", name: "Z kapustą i pieczarkami, 15 szt.", desc: "Kiszona kapusta z pieczarkami, z cebulką i śmietaną.", price: 31.5 },
    { id: "pierogi-ziemn-piecz", cat: "pierogi", name: "Z ziemniakami i pieczarkami, 15 szt.", desc: "Kremowy farsz ziemniaczany ze smażonymi pieczarkami.", price: 32 },
    { id: "pierogi-ziemn-grzyby", cat: "pierogi", name: "Z ziemniakami i grzybami, 30 szt.", desc: "Podwójna porcja, z cebulką i śmietaną.", price: 58 },
    { id: "pierogi-wisnie", cat: "pierogi", name: "Z wiśniami, 15 szt.", desc: "Na słodko, z lekko kwaskowymi wiśniami i śmietaną.", price: 35 },

    { id: "nal-twarog-slodko", cat: "nalesniki", name: "Z twarogiem na słodko, 3 szt.", desc: "Do wyboru: śmietana, toffi lub sos czekoladowy.", price: 25, img: "nalesniki", popular: true },
    { id: "nal-twarog-slono", cat: "nalesniki", name: "Z twarogiem na słono, 3 szt.", desc: "Twaróg z ziołami, podane ze śmietaną.", price: 25 },
    { id: "nal-rodzynki", cat: "nalesniki", name: "Z twarogiem i rodzynkami, 3 szt.", desc: "Klasyka na słodko.", price: 26 },
    { id: "nal-kapusta", cat: "nalesniki", name: "Z kapustą i grzybami, 3 szt.", desc: "Wegetariańskie, z duszoną kapustą i cebulką.", price: 27 },
    { id: "nal-szpinak", cat: "nalesniki", name: "Ze szpinakiem, fetą i mozzarellą, 3 szt.", desc: "Szpinak i dwa sery.", price: 26 },
    { id: "nal-jablko", cat: "nalesniki", name: "Z jabłkiem i cynamonem, 3 szt.", desc: "Z odrobiną cukru.", price: 25 },
    { id: "nal-szynka", cat: "nalesniki", name: "Duży z szynką i serem", desc: "Z sosem czosnkowym w środku.", price: 35 },
    { id: "nal-banan", cat: "nalesniki", name: "Duży z bananem i Nutellą", desc: "Cienki naleśnik, banan i krem czekoladowy.", price: 25, popular: true },
    { id: "nal-nutella", cat: "nalesniki", name: "Duży z Nutellą", desc: "Prosto i na słodko.", price: 20 },
    { id: "nal-cukier", cat: "nalesniki", name: "Duży z cukrem i masłem", desc: "Jak u babci.", price: 16 },

    { id: "salatka-kurczak", cat: "salatki", name: "Sałatka z kurczakiem, 250 g", desc: "Mix sałat, kurczak, ogórek, pomidorki, kukurydza, oliwki, sos czosnkowy. Ok. 357 kcal.", price: 22, img: "salatka-kurczak", popular: true },
    { id: "salatka-feta", cat: "salatki", name: "Sałatka z fetą lub mozzarellą, 250 g", desc: "Pomidorki, ogórek, oliwki, oliwa i prażony słonecznik. Ok. 450 kcal.", price: 22, img: "salatka-feta", popular: true },
    { id: "salatka-ciecierzyca", cat: "salatki", name: "Sałatka z ciecierzycą", desc: "Sycąca sałatka z ciecierzycą i świeżymi warzywami.", price: 24, img: "salatka-ciecierzyca" },

    { id: "espresso", cat: "kawa", name: "Espresso", desc: "50 ml", price: 9.5 },
    { id: "americano", cat: "kawa", name: "Americano", desc: "200 ml", price: 10 },
    { id: "cappuccino", cat: "kawa", name: "Cappuccino", desc: "250 ml", price: 11 },
    { id: "latte", cat: "kawa", name: "Latte", desc: "200 ml", price: 11 },
    { id: "macchiato", cat: "kawa", name: "Latte macchiato", desc: "200 ml", price: 11 }
  ]
};
