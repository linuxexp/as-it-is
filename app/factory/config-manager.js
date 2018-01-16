const hash = require("object-hash");

angular.module('angular-common')
    .factory('configManager', function () {
        const configLocalKey = 'as-it-is-config-manager';

        const getLatestConfig = () => JSON.parse(localStorage.getItem(configLocalKey)) || {};
        const setConfig = (config) => localStorage.setItem(configLocalKey, JSON.stringify(config));

        let configManager = getLatestConfig();

        let version = 0;

        const updateConfig = (updateCB) => {
            configManager = getLatestConfig();
            updateCB();
            setConfig(configManager);
            configManager = getLatestConfig();
            version += 1;
        };

        return {
            markAsRead: function(doc) {
                updateConfig(() => {
                   configManager.markedAsRead = configManager.markedAsRead || {};
                   configManager.markedAsRead[doc.id] = true;
                });
            },
            clearAllRead: () => {
                updateConfig(() => {
                   configManager.markedAsRead = {};
                });
            },
            isMarkedAsRead: function(doc) {
                if (configManager.markedAsRead) {
                    return configManager.markedAsRead[doc.id];
                }
                return false;
            },
            markInBookmark: function(doc) {
                updateConfig(() => {
                   configManager.markInBookmark = configManager.markInBookmark || {};
                   configManager.markInBookmark[doc.id] = true;
                });
            },
            clearAllBookmarks: () => {
              updateConfig(() => {
                 configManager.markInBookmark = {};
              });
            },
            isBookmarked: function(doc) {
              if (configManager.markInBookmark) {
                  return configManager.markInBookmark[doc.id];
              }
              return false;
            },
            getRead: () => configManager.markedAsRead || {},
            getAllBookmarks: () => configManager.markInBookmark || {},
            setSettings: (settings) => updateConfig(() => configManager.settings = settings),
            getSettings: () => configManager.settings || {},
            version: () => version
        };
    });
