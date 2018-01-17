/**
 * Created by raja on 16/01/18.
 */

const _ = require("lodash");

describe('Book Definition', function() {

   let book;
   let schema;

   beforeEach(function() {
      window.module("angular-common");
      inject(function(_bookStore_) {
         book = _bookStore_.getBook();
         schema = {
             'index': _.isNumber,
             'purport': _.isString,
             'verses': _.isArray,
             'title': _.isString,
             'entity': _.isString
         };
      });
   });

   describe('Book', function() {
      it('should be array of chapters', function() {
          assert(_.isArray(book));
      });

      describe('Chapters', function() {

          it('should be defined properly', function() {
             _.every(book, (chapter) => {

                 assert(chapter.hasOwnProperty('index') && _.isNumber(chapter['index']));

                 assert(chapter.hasOwnProperty('purport') && _.isString(chapter['purport']));

                 assert(chapter.hasOwnProperty('title') && _.isString(chapter['title']));

                 assert(chapter.hasOwnProperty('entity') && _.isString(chapter['entity'])
                     && chapter['entity'] == 'chapter');
             });
          });

          describe('Verses', function() {

            it('should be defined properly', function() {

                _.every(book, (chapter) => {

                    _.every(chapter.verses, (verse) => {

                        assert(verse.hasOwnProperty('index') && _.isNumber(verse['index']));

                        assert(verse.hasOwnProperty('purport') && _.isArray(verse['purport']));

                        assert(verse.hasOwnProperty('entity') && _.isString(verse['entity'])
                             && verse['entity'] == 'verse');

                        assert(verse.hasOwnProperty('content') && _.isObject(verse['content']));

                        assert(_.isString(verse['content'].en) && _.isObject(verse['content'].sans));

                        assert(verse.hasOwnProperty('synonyms') && _.isObject(verse['synonyms']));

                    });

                });

            });

          });

      });

   });

});