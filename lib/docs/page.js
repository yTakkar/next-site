import { getLatestTag } from '../github/api';
import { getRawFileFromRepo } from '../github/raw';
import { removeFromLast } from './utils';

// Default tag if the latest release was not found
const TAG = 'v9.3.2-canary.4';
// If a version different from the latest release is required, update TAG with the wanted
// version and set this to `true`
const FORCE_TAG = true;

export async function getCurrentTag(tag) {
  if (FORCE_TAG) return TAG;
  return tag || getLatestTag();
}

export async function fetchDocsManifest(tag) {
  const res = await getRawFileFromRepo('/docs/manifest.json', tag);
  return JSON.parse(res);
}

export function findRouteByPath(path, routes) {
  // eslint-disable-next-line
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, '.') === path) {
      return route;
    }
    const childPath = route.routes && findRouteByPath(path, route.routes);
    if (childPath) return childPath;
  }
}

export function getPaths(nextRoutes, carry = []) {
  nextRoutes.forEach(({ path, routes }) => {
    if (path) {
      carry.push(removeFromLast(path, '.'));
    } else if (routes) {
      getPaths(routes, carry);
    }
  });

  return carry;
}
