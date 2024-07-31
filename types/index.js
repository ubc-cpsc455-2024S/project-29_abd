// import { Icons } from "../src/components/ui/icons";

// JSDoc comments for keeping type documentation

/**
 * @typedef {Object} NavItem
 * @property {string} title
 * @property {string} [href]
 * @property {boolean} [disabled]
 * @property {boolean} [external]
 * @property {string} [icon]
 * @property {string} [label]
 * @property {string} [description]
 */

/**
 * @typedef {NavItem} NavItemWithChildren
 * @property {NavItemWithChildren[]} items
 */

/**
 * @typedef {NavItem} NavItemWithOptionalChildren
 * @property {NavItemWithChildren[]} [items]
 */

/**
 * @typedef {Object} FooterItem
 * @property {string} title
 * @property {Object[]} items
 * @property {string} items.title
 * @property {string} items.href
 * @property {boolean} [items.external]
 */

/**
 * @typedef {NavItemWithOptionalChildren} MainNavItem
 */

/**
 * @typedef {NavItemWithChildren} SidebarNavItem
 */

/**
 * @typedef {Object} MapLocation
 * @property {string} id
 * @property {number} lat
 * @property {number} lng
 */

