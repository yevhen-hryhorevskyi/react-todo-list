// keep sync with 'routes.js' file which configures react-router
export const ROOT_URL = "/";
const ROOT_URL_PREFIX = ""; //To follow the subdomains of the root url = "/"

export const TASK_LIST_URL = `${ROOT_URL_PREFIX}/tasks`;
export const NEW_TASK_URL = `${TASK_LIST_URL}/new`;
export const ABOUT_URL = `${ROOT_URL_PREFIX}/about`;
