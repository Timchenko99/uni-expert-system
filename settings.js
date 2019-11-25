const fs = require('fs');
const path = require('path')

// bootstrap.min.css will be created or overwritten by default.
function copy(src, dest){
    fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log('File was copied to '+dest);
      });
}

copy(`${__dirname}/node_modules/materialize-css/dist/css/materialize.css`, `${__dirname}/public/css/materialize.css`)
copy(`${__dirname}/node_modules/materialize-css/dist/js/materialize.js`, `${__dirname}/public/js/materialize.js`)
copy(`${__dirname}/node_modules/chart.js/dist/Chart.min.js`, `${__dirname}/public/js/Chart.min.js`)
copy(`${__dirname}/node_modules/chart.js/dist/Chart.min.css`, `${__dirname}/public/css/Chart.min.css`)
copy(`${__dirname}/node_modules/ejs/ejs.min.js`, `${__dirname}/public/js/ejs.min.js`)

