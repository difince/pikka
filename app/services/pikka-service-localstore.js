import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,
    
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
    
    // cache data in the memory. default is true.
    enableCache: true,
    
    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
        // we'll talk about the details later.
    }
})

export let defaultConfig = function (){
    return {
        listTitle: "Pikka List",
        showIp: false,
    };
}

export let newPikka = function (){
    return {
        name: "default",
        ip: "172.16.100.2",
        port: "161",
        oid: ".1.3.6.1.4.1.19865.1.2.1.1.0",
        snmpVersion: "1",
        community: "private",
        picture: "http://lan.neomontana-bg.com/photos/picoip.jpg"
    };
}

export let pikkaId = function (pikka){
    return pikka.ip + ":" + pikka.port + ":" + pikka.oid;
}

// Simulating async calls for plug-and-play replacement with REST services
export let findAll = () => new Promise((resolve, reject) => {
    storage.getAllDataForKey('pikkas').then(pikkas => {
        resolve(pikkas.reduce(function(map, obj) {
            map[pikkaId(obj)] = obj;
            return map;
        }, {}));
    });
});

export let findByName = (name) => new Promise((resolve, reject) => {
    storage.getAllDataForKey('pikkas').then(pikkas => {
        let filtered = pikkas.filter(pikka => (pikka.name + ' ' + pikka.ip).toLowerCase().indexOf(name.toLowerCase()) > -1);
        if (filtered[0]) {
            resolve(filtered.reduce(function(map, obj) {
                map[pikkaId(obj)] = obj;
                return map;
            }, {}));
        } else {
            resolve({});
        }
    });
});

export let savePikka = (pikka) => new Promise((resolve, reject) => {
    storage.save({
        key: 'pikkas',
        id: pikkaId(pikka),
        data: pikka
    }).then(p => {
        addKey(pikkaId(pikka)).then(id => {
            resolve(pikka);
        });
    });
});

export let deletePikka = (pikka) => new Promise((resolve, reject) => {
    storage.remove({
        key: 'pikkas',
        id: pikkaId(pikka)
    }).then(p => {
        deleteKey(pikkaId(pikka)).then(id => {
            resolve(pikka);
        });
    });

});

export let findById = (pikkaId) => new Promise((resolve, reject) => {
    storage.load({
        key: 'pikkas',
        id: pikkaId
    }).then(pikka => {
        // found data goes to then()
        resolve(pikka);
    }).catch(err => {
        resolve(newPikka());
    });
});

export let getSortedKeys = () => new Promise((resolve, reject) => {
    storage.load({
        key: 'keys',
        id: 'ordered'
    }).then(ids => {
        // found data goes to then()
        resolve(JSON.parse(ids));
    }).catch(err => {
        resolve([]);
    });
});

let addKey = (key) => new Promise((resolve, reject) => {
    storage.load({
        key: 'keys',
        id: 'ordered'
    }).then(ids => {
        // found data goes to then()
        ids = JSON.parse(ids)
        ids.unshift(key);
        ids = ids.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
        },[]);
        storage.save({
            key: 'keys',
            id: 'ordered',
            data: JSON.stringify(ids)
        }).then(ids => {
            resolve(key);
        });
    }).catch(err => {
        storage.save({
            key: 'keys',
            id: 'ordered',
            data: JSON.stringify([key])
        }).then(ids => {
            resolve(key);
        });
    });
});

let deleteKey = (key) => new Promise((resolve, reject) => {
    storage.load({
        key: 'keys',
        id: 'ordered'
    }).then(ids => {
        // found data goes to then()
        ids = JSON.parse(ids)
        ids = ids.filter(e => e !== key);
        storage.save({
            key: 'keys',
            id: 'ordered',
            data: JSON.stringify(ids)
        }).then(ids => {
            resolve(key);
        });
    });
});

export let updateKeys = (keys) => new Promise((resolve, reject) => {
    storage.save({
        key: 'keys',
        id: 'ordered',
        data: JSON.stringify(keys)
    }).then(ids => {
        resolve(keys);
    });
});

export let getConfig = () => new Promise((resolve, reject) => {
    storage.load({
        key: 'pikkaconfig',
        id: 'config'
    }).then(config => {
        resolve(JSON.parse(config));
    }).catch(err => {
        resolve(defaultConfig());
    });
});

export let saveConfig = (config) => new Promise((resolve, reject) => {
    storage.save({
        key: 'pikkaconfig',
        id: 'config',
        data: JSON.stringify(config)
    }).then(ids => {
        resolve(config);
    });
});
