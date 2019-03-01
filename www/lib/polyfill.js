import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/from';
import 'core-js/fn/object/entries';
import 'core-js/fn/object/values';
import 'core-js/fn/symbol/iterator';

if (!Object.entries) {
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i);
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
