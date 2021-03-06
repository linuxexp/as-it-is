const hash = require("object-hash");
const data = require("./book.json");

angular.module('angular-common')
    .service('bookStore', function () {

        // https://www.json-generator.com/ definition
        /*
        var bookStructure = [
            '{{repeat(2)}}',
            {
                "entity": "chapter",
                "index": "{{index()}}",
                "purport": "{{lorem(1)}}",
                "verses": [
                    '{{repeat(2)}}',
                    {
                        "entity": "verse",
                        "index": "{{index()}}",
                        "content": {
                            "en": "English content for V{{index()}} {{lorem(1)}}",
                            "sans": [
                                 "@dhrtarastra @uvaca",
                                 "@dharma-ksetre @kuru-ksetre",
                                 "@samaveta @yuyutsavah",
                                 "@mamakah @pandavas ca@(ca)iva@(eva)",
                                 "@kim @akurvata @sanjaya"
                            ]
                        },
                        "synonyms": {
                             "dhrtarastra": "King Dhrtarastra",
                             "uvaca": "said",
                             "dharma-ksetre": "in the place of pilgrimage",
                             "kuru-ksetre": "in the place named Kuruksetra",
                             "samaveta": "assembled",
                             "yuyutsavah": "desiring to fight",
                             "mamakah": "my party (sons)",
                             "pandavas": "the sons of Pandu",
                             "ca": "and",
                             "eva": "certainly",
                             "kim": "what",
                             "akurvata": "did they do",
                             "sanjaya": "O Sanjaya"
                         },
                        "purport": [
                             "Bhagavad-gita is the widely read theistic science summarized in the Gita-mahatmya (Glorification of the Gita). There it says that one should read Bhagavad-gita very scrutinizingly with the help of a person who is a devotee of Sri Krsna and try to understand it without personally motivated interpretations. The example of clear understanding is there in the Bhagavad-gita itself, in the way the teaching is understood by Arjuna, who heard the Gita directly from the Lord. If someone is fortunate enough to understand Bhagavad-gita in that line of disciplic succession, without motivated interpretation, then he surpasses all studies of Vedic wisdom, and all scriptures of the world. One will find in the Bhagavad-gita all that is contained in other scriptures, but the reader will also find things which are not to be found elsewhere. That is the specific standard of the Gita. It is the perfect theistic science because it is directly spoken by the Supreme Personality of Godhead, Lord Sri Krsna.",
                             "The topics discussed by Dhrtarastra and Sanjaya, as described in the Mahabharata, form the basic principle for this great philosophy. It is understood that this philosophy evolved on the Battlefield of Kuruksetra, which is a sacred place of pilgrimage from the immemorial time of the Vedic age. It was spoken by the Lord when He was present personally on this planet for the guidance of mankind.",
                             "The word dharma-ksetra (a place where religious rituals are performed) is significant because, on the Battlefield of Kuruksetra, the Supreme Personality of Godhead was present on the side of Arjuna. Dhrtarastra, the father of the Kurus, was highly doubtful about the possibility of his sons' ultimate victory. In his doubt, he inquired from his secretary Sanjaya, \"What did my sons and the sons of Pandu do ?\" He was confident that both his sons and the sons of his younger brother Pandu were assembled in that Field of Kuruksetra for a determined engagement of the war. Still, his inquiry is significant. He did not want a compromise between the cousins and brothers, and he wanted to be sure of the fate of his sons on the battlefield. Because the battle was arranged to be fought at Kuruksetra, which is mentioned elsewhere in the Vedas as a place of worship—even for the denizens of heaven—Dhrtarastra became very fearful about the influence of the holy place on the outcome of the battle. He knew very well that this would influence Arjuna and the sons of Pandu favorably, because by nature they were all virtuous. Sanjaya was a student of Vyasa, and therefore, by the mercy of Vyasa, Sanjaya was able to envision the Battlefield of Kuruksetra even while he was in the room of Dhrtarastra. And so, Dhrtarastra asked him about the situation on the battlefield.",
                             "Both the Pandavas and the sons of Dhrtarastra belong to the same family, but Dhrtarastra's mind is disclosed herein. He deliberately claimed only his sons as Kurus, and he separated the sons of Pandu from the family heritage. One can thus understand the specific position of Dhrtarastra in his relationship with his nephews, the sons of Pandu. As in the paddy field the unnecessary plants are taken out, so it is expected from the very beginning of these topics that in the religious field of Kuruksetra where the father of religion, Sri Krsna, was present, the unwanted plants like Dhrtarastra's son Duryodhana and others would be wiped out and the thoroughly religious persons, headed by Yudhisthira, would be established by the Lord. This is the significance of the words dharma-ksetre and kuru-ksetre, apart from their historical and Vedic importance."
                         ]
                    }
                ],
                "title": "Title for Chapter {{index()}} {{lorem(1)}}"
            }
        ];*/

        const book = data;
        const calcUids = (book) => {
            return book.map((chapter) => {
               chapter.verses = chapter.verses.map((verse) => {
                   verse.id = hash(verse);
                   return verse;
               });
               chapter.id = hash(chapter);
               return chapter;
            });
        };

        const hashedBook = calcUids(book);

        return {
            getBook: function() {
                return hashedBook;
            }
       };
    });