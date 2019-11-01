import _ from 'lodash';

export default class Arrays {

    /*
     * Filter an array of objects with the values of antoher a array comparing with key
     */
    static filterByArray(values: [], find: any[], key: string) {
      var result = [];
      _.forEach(values, function (n1, key1) {
         _.forEach(find, function (n2, key2) {
            if (n1[key] == n2) {
               result.push(n1);
            }
         });
      });
      return result;
    }

    /*
     * Filter an array of objects with the values of antoher a array comparing all keys in both arrays
     */
    static filterByObjectArray(values: [], find: any[], keys: string[]) {
      var result = [];
      _.forEach(values, function (n, key) {
         _.forEach(find, function (n2, key2) {
            var r = _.reduce(keys, function(partial, key3) {
              return partial && (n[key3] == n2[key3]);
            }, true);
            if(r){
              result.push(n);
            }
         });
      });
      return result;
    }

}
