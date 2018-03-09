import * as baseService from './base';

async function allLocations() {
    return baseService.get(`/api/locations/`);
}

async function all(typeid) {
    return baseService.get(`/api/locations/${typeid}/`);
}

async function one(typeid, id) {
    return baseService.get(`/api/locations/${typeid}/${id}`);
}

export { all, one }; //insert, update, destroy