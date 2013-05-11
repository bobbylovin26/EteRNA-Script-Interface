BlockManager.add_blocks("<block name=\"body\">   <div id=\"page\">     <div id=\"content\" style=\"position:relative; z-index:0;\"></div>   </div> </block>   <block name=\"overlay\">   <div id=\"overlay-under\" class=\"block-overlay-under\"></div>   <div id=\"overlay\" class=\"block-overlay\">      <div class=\"center-block block-overlay-panelholder\" id=\"overlay-panelholder\">       <block name=\"overlay-loading\" defonly=\"true\">         <div class=\"overlay-panel\">           <div class=\"small-loading\"></div>         </div>       </block>        <block name=\"overlay-yesno\" defonly=\"true\">         <div class=\"overlay-panel\">           {text}           <div class=\"overlay-yesno-buttons\">             <span id=\"yes\">Yes</span>&nbsp;&nbsp;&nbsp;             <span id=\"no\">No</span>           </div>         </div>       </block>        <block name=\"overlay-message\" defonly=\"true\">         <div class=\"overlay-panel\">           {text}           <div class=\"overlay-message-buttons\">             <span id=\"ok\" class=\"ok-button\">닫기</span>           </div>         </div>       </block>            </div>     <div class=\"clickable\" id=\"overlay-close-layer\" style=\"position:fixed; width:100%; height:100%; z-index:0; right:30px; bottom:30px;\"></div>   </div> </block>   <block name=\"comments\" builder=\"BuilderComments\" input=\"comments:{comments}; nid:{nid}\">   <div id=\"comments\" packerinput=\"block-name:comment\">     <block defonly=\"1\" name=\"comment\" builder=\"BuilderComment\" style=\"clear:both; width:680px; padding-bottom:19px;\">       <div style=\"float:left; width:30px\">         <img src=\"{picture}\" style=\"max-width:30px; max-height:30px; width:auto; height:auto\"></img>       </div>       <div style=\"float:left; width:560px; padding-left:10px; text-align:left;\">         <div>           <a href=\"/web/player/{uid}/\">{name}</a>&nbsp;&nbsp;           <span>{comment}</span>         </div>         <div style=\"font-size:10px; padding-top:11px;\">           {created}           {IF is_deletable}             &nbsp;&nbsp;<span id=\"delete\" class=\"clickable\">[delete]</span>           {ENDIF}         </div>       </div>       <div class=\"clearer\"></div>     </block>   </div>   {IF logged_in}     <div>       <textarea class=\"dark-input centered\" id=\"comment-input\" style=\"width:680px; min-height:25px;\"></textarea>     </div>     <div style=\"padding-top:7px; padding-bottom:7px;\">       <div id=\"comment-submit\" style=\"float:right; padding:3px; font-size:11px;\" class=\"green-button clickable\">         <div class=\"green-button-bg\"></div>         Leave a Comment       </div>       <div class=\"clearer\"></div>     </div>   {ELSE}     <div style=\"text-align:center; padding:11px; color:#EEEEEE\">Please log in to leave a comment</div>   {ENDIF}  </block> ");