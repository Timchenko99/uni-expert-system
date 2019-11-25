// //require('@tensorflow/tfjs-node')
const {KNeighborsClassifier} = require('machinelearn/neighbors');


function predict(userData, fileData){
    const attrs = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak']
    const y = fileData.map( obj => obj['target']);

    fileData.map(obj => removeFromObject(obj, ['slope','ca', 'thal', 'target']))

    var x = [];
    for (var index in fileData) {
        if (fileData.hasOwnProperty(index)) {
            x.push(attrs.map( (attr) => Number(fileData[index][attr])));
        }
    }

    userData = attrs.map( attr => Number(userData[attr]))

    knn = new KNeighborsClassifier();

    knn.fit(x ,y);

    //console.log(knn.predict(userData));
    
    return knn.predict(userData);
}

exports.predict = predict

function removeFromObject(_json, paramsToRemove){
    if(!Array.isArray(paramsToRemove))throw new TypeError("Params must be an array!");
    paramsToRemove.forEach(element => {
        delete _json[element];
    });
}