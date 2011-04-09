/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @provides fb.xfbml.logoutbutton
 * @layer xfbml
 * @requires fb.type
 *           fb.intl
 *           fb.xfbml.buttonelement
 *           fb.helper
 *           fb.auth
 */

/**
 * Implementation for fb:logout-button tag.
 *
 * @class FB.XFBML.LogoutButton
 * @extends  FB.XFBML.ButtonElement
 * @private
 */
FB.subclass('XFBML.LogoutButton', 'XFBML.ButtonElement', null, {
  /**
   * Do initial attribute processing.
   *
   * @return {Boolean} true to continue processing, false to halt it
   */
  setupAndValidate: function() {
    this.logout = this.getAttribute('logout');

    return true;
  },

  /**
   * Should return the button markup. The default behaviour is to return the
   * original innerHTML of the element.
   *
   * @return {String} the HTML markup for the button
   */
  getButtonMarkup: function() {
    var originalHTML = this.getOriginalHTML();
    if (originalHTML === '') {
      return FB.Intl.tx('cs:logout');
    } else {
      return originalHTML;
    }
  },

  /**
   * The ButtonElement base class will invoke this when the button is clicked.
   */
  onClick: function() {
    if (this.logout == 'app') {
      FB.api({method:'auth.revokeAuthorization'});
    } else {
      FB.logout();
    }
  }
});
