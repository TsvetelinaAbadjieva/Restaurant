module.exports={
    css:{
        loaderOptions:{
            scss:{
                additionalData:`
                @import "./src/scss/_variables.scss";
                @import "./src/scss/_mixins.scss";
                @import "./src/scss/_functions.scss";
                `
            }
        }
    }
}