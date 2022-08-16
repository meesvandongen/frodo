import util from 'util';
import storage from '../../storage/SessionStorage.js';

const realmPathTemplate = '/realms/%s';

/**
 * Get current realm path
 * @returns {string} a CREST-compliant realm path, e.g. /realms/root/realms/alpha
 */
export function getCurrentRealmPath() {
  let realm = storage.session.getRealm();
  if (realm.startsWith('/') && realm.length > 1) {
    realm = realm.substring(1);
  }
  let realmPath = util.format(realmPathTemplate, 'root');
  if (realm !== '/') {
    realmPath += util.format(realmPathTemplate, realm);
  }
  return realmPath;
}

/**
 * Get current realm name
 * @returns {string} name of the current realm. /alpha -> alpha
 */
export function getCurrentRealmName() {
  const realm = storage.session.getRealm();
  const components = realm.split('/');
  let realmName = '/';
  if (components.length > 0 && realmName !== realm) {
    realmName = components[components.length - 1];
  }
  return realmName;
}

/**
 * Get current realm name
 * @param {string} realm realm
 * @returns {string} name of the realm. /alpha -> alpha
 */
export function getRealmName(realm) {
  const components = realm.split('/');
  let realmName = '/';
  if (components.length > 0 && realmName !== realm) {
    realmName = components[components.length - 1];
  }
  return realmName;
}

/**
 * Get tenant base URL
 * @param {string} tenant tenant URL with path and query params
 * @returns {string} tenant base URL without path and query params
 */
export function getTenantURL(tenant) {
  const parsedUrl = new URL(tenant);
  return `${parsedUrl.protocol}//${parsedUrl.host}`;
}

/**
 * Deep delete keys and their values from an input object. If a key in object contains substring, the key an its value is deleted.
 * @param {Object} object input object that needs keys removed
 * @param {string} substring substring to search for in key
 * @returns the modified object without the matching keys and their values
 */
export function deleteDeepByKey(object, substring) {
  const obj = object;
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (key.indexOf(substring) > 0) {
      delete obj[key];
    } else if (Object(obj[key]) === obj[key]) {
      obj[key] = deleteDeepByKey(obj[key], substring);
    }
  }
  return obj;
}
