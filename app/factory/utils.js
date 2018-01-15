/**
 * Created by raja on 19/12/17.
 */
const hash = require("object-hash");
angular.module('angular-common')
    .service('utils', function () {

        const annotedToken = /@([\S]*)/g;
        const nestedToken = /@\(([^)]*)\)/g;

        const isAnnoted = function(word) {
          return annotedToken.test(word);
        };

        const getKey = function(word, dictionary) {
            return word.replace(annotedToken, function(m, g) {
                if (nestedToken.test(m)) {
                    const k = m.replace(nestedToken, function(w, l) {
                       return `<i><small>(${dictionary[l]})</small></i>`;
                    });
                    return k;
                } else {
                    return `<b>${g}</b> <i><small>(${dictionary[g]})</small></i>`;
                }
            })
        };

        const buildFromAnnotated = function(text, dictionary) {
            const spaceSplit = text.split(" ");
            const tokens = spaceSplit.map(function(token) {
               if (isAnnoted(token)) {
                   return getKey(token, dictionary);
               }
               return token;
            });
            return tokens.join(" ");
        };

        /*

        [
            {
                score: <number> // used to sort the rank
                doc: {   // matched entity as it is (chapter, verse, synonyms)
                }
                match: { // shown in list, html
                }
            }
         ]

         */

        const buildNewResultDoc = function (doc, ancestor) {
          return {
              docId: doc.id,
              score: 0,
              doc: doc,
              match: {

              },
              ancestor: ancestor
          };
        };

        const findIn = (text, keyword) => {
            // console.log(text, keyword);
            return text.toLowerCase().indexOf(keyword.toLowerCase()) >=0;
        };

        const getSearchResults = function(query, book) {
            if (!query) return [];

            let matches = {}; // use to calculate scores in iterative runs
            book.forEach(function(chapter) {

                const chapterDocId = chapter.id;
                let chapterRecord = matches[chapterDocId] || buildNewResultDoc(chapter);

                // check if query in chapter purport
                if (findIn(chapter.purport, query)) {
                    chapterRecord.score += 1;
                }

                // check if query in chapter title
                if (findIn(chapter.title, query)) {
                    chapterRecord.score += 1;
                }

               // check if query is in verse
               chapter.verses.forEach(function(verse) {
                   const verseDocId = verse.id;
                   let verseRecord = matches[verseDocId] || buildNewResultDoc(verse, chapter);

                   // update scores if in english translation
                   if (findIn(verse.content.en, query)) {
                       console.log("updating score content.en match");
                       verseRecord.score += 1;
                   }

                   // update scores if is in any paras
                   verse.purport.forEach(function(para) {
                      if (findIn(para, query)) {
                          console.log("updating score para match");
                          verseRecord.score += 1;
                      }
                   });

                   matches[verseDocId] = verseRecord;
               });

                matches[chapterDocId] = chapterRecord;

            });

            return _.orderBy(_.filter(_.map(matches, (m) => m), (o) => o.score>0), "score");
        };

        return {
          buildFromAnnotated: buildFromAnnotated,
          getSearchResults: getSearchResults,
          head: (arrays) => _.head(arrays),
          getProgress: (book, readList) => {

              const verseTable = book.map((chapter) => {
                 return chapter.verses.map((verse) => {
                   verse.chapter = chapter;
                   return verse;
                 });
              });

              const allVerses = _.flatten(verseTable);


              const filtered = _.transform(allVerses, (result, verse) => {
                 if (_.includes(readList, verse.id)) {
                     result.push(verse);
                     return true;
                 } else {
                     return false;
                 }
              }, []);

              return {
                progress: {
                    total: allVerses.length,
                    read: filtered.length
                },
                filtered: filtered,
                verses: allVerses
              };

          }
        };
    });
