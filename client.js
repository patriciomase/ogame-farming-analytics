// ==UserScript==
// @name         Ogame Farm Analytics
// @namespace    OFA
// @version      0.1
// @description  Ogame Farming history tool
// @author       Patricio Gabriel Maseda
// @match        https://s119-es.ogame.gameforge.com/game/index.php?page=messages
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $.get('https://s119-es.ogame.gameforge.com/game/index.php?page=messages&tab=21&ajax=1')
      .then(function(response) {
        
        var meta = $(document).find('meta');
        var metaObject = {};
        $(meta).each(function(index, element) {
            metaObject[element.getAttribute('name')] = element.getAttribute('content');
        });
        console.log('metaObject built', metaObject);
        
        var messages = $(response).find('li.msg');
        console.log('OFA ajax executed');
        
        /* extract the data we need */
        var dataWeNeed = [];
        
        messages.map(function(i, elem) {
          
            console.log('element found', elem);
            
            dataWeNeed.push({
                id: $(elem).data('msg-id'),
                date: $(elem).find('.msg_date').html(),
                attacker: $(elem).find('.combatLeftSide .msg_ctn2').html().match(/\(([^()]+)\)/g).toString().replace('(', '').replace(')', ''),
                attackerLosses: $(elem).find('.combatLeftSide .msg_ctn2').html().match(/\d+$/).pop(),
                resources: $(elem).find('.combatLeftSide .msg_ctn3').html().match(/\:(.*)\,/).pop(),
                defender: $(elem).find('.combatRightSide .msg_ctn2').html().match(/\(([^()]+)\)/g).toString().replace('(', '').replace(')', ''),
                repaired: $(elem).find('.combatRightSide .msg_ctn3').html().match(/\d+/g).pop(),
                moon: $(elem).find('.msg_ct3').html(),
                position: $(elem).find('.undermark a').html().replace('[', '').replace(']', ''),
                
            });
            
        });
        
        console.log(dataWeNeed);
    });
})();
