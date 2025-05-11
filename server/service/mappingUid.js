const mappingUid = new Map();

function mappingSet(uid, user) {
  mappingUid.set(uid, user);
}

function mappingGet(uid) {
  return mappingUid.get(uid);
}

module.exports = {
  mappingSet,
  mappingGet,
};
