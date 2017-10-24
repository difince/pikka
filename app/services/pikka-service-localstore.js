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

export let defaultPikka = {
    name: "",
    ip: "172.16.100.2",
    port: "161",
    oid: ".1.3.6.1.4.1.19865.1.2.1.1.0",
    snmpVersion: "1",
    community: "private",
    picture: "http://lan.neomontana-bg.com/photos/picoip.jpg"
};

// Simulating async calls for plug-and-play replacement with REST services
export let findAll = () => new Promise((resolve, reject) => {
    storage.getAllDataForKey('pikkas').then(pikkas => {
        resolve(pikkas);
    });
});

export let findByName = (name) => new Promise((resolve, reject) => {
    findAll().then(pikkas => {
        let filtered = pikkas.filter(pikka => (pikka.name + ' ' + pikka.ip).toLowerCase().indexOf(name.toLowerCase()) > -1);
        if (filtered[0]) {
            resolve(filtered);
        } else {
            resolve({defaultPikka});
        }
    });
});

export let savePikka = (pikka) => new Promise((resolve, reject) => {
    storage.save({
        key: 'pikkas',
        id: pikka.name, 
        data: pikka
    });

    resolve(pikka);
});

export let deletePikka = (pikka) => new Promise((resolve, reject) => {
    storage.remove({
        key: 'pikkas',
        id: pikka.name
    });

    resolve(pikka);
});

export let findById = (name) => new Promise((resolve, reject) => {
    storage.load({
        key: 'pikkas',
        id: name
    }).then(pikka => {
        // found data goes to then()
        resolve(pikka);
    }).catch(err => {
        resolve(defaultPikka);
    });
});
