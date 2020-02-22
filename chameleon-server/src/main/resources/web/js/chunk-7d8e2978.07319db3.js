(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d8e2978"],{"0b81":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("CVselect",{attrs:{name:"Camera",list:t.cameraList},on:{input:function(e){return t.handleInput("currentCamera",t.currentCameraIndex)}},model:{value:t.currentCameraIndex,callback:function(e){t.currentCameraIndex=e},expression:"currentCameraIndex"}}),a("CVnumberinput",{attrs:{name:"Diagonal FOV"},model:{value:t.cameraSettings.fov,callback:function(e){t.$set(t.cameraSettings,"fov",e)},expression:"cameraSettings.fov"}}),a("br"),a("CVnumberinput",{attrs:{name:"Camera pitch",step:.01},model:{value:t.cameraSettings.tilt,callback:function(e){t.$set(t.cameraSettings,"tilt",e)},expression:"cameraSettings.tilt"}}),a("br"),a("v-btn",{staticStyle:{"margin-top":"10px"},attrs:{small:"",color:"#4baf62"},on:{click:t.sendCameraSettings}},[t._v("Save Camera Settings\n        ")])],1),a("div",{staticStyle:{"margin-top":"15px"}},[a("span",[t._v("3D Calibration")]),a("v-divider",{staticStyle:{"margin-bottom":"10px"},attrs:{color:"white"}}),a("v-row",[a("v-col",[a("CVselect",{attrs:{name:"Resolution",list:t.stringResolutionList},model:{value:t.resolutionIndex,callback:function(e){t.resolutionIndex=e},expression:"resolutionIndex"}})],1),a("v-col",[a("CVnumberinput",{attrs:{name:"Square Size (in)"},model:{value:t.squareSize,callback:function(e){t.squareSize=e},expression:"squareSize"}})],1)],1),a("v-row",[a("v-col",[a("v-btn",{attrs:{small:"",color:t.calibrationModeButton.color,disabled:t.checkResolution},on:{click:t.sendCalibrationMode}},[t._v("\n                    "+t._s(t.calibrationModeButton.text)+"\n                ")])],1),a("v-col",[a("v-btn",{attrs:{small:"",color:t.cancellationModeButton.color,disabled:t.checkCancelation},on:{click:t.sendCalibrationFinish}},[t._v("\n                    "+t._s(t.cancellationModeButton.text)+"\n                ")])],1),a("v-col",[a("v-btn",{attrs:{color:"whitesmoke",small:""},on:{click:function(e){return t.$refs.calibrationFile.click()}}},[t._v("\n                    Download Checkerboard\n                ")]),a("a",{ref:"calibrationFile",staticStyle:{color:"black","text-decoration":"none",display:"none"},attrs:{href:i("66a3"),download:"Calibration Board.png"}})],1)],1),t.isCalibrating?a("v-row",[a("v-col",[a("span",[t._v("Snapshot Amount: "+t._s(t.snapshotAmount))])])],1):t._e(),t.isCalibrating?a("div",[a("v-checkbox",{attrs:{label:"Advanced Menu",dark:""},model:{value:t.isAdvanced,callback:function(e){t.isAdvanced=e},expression:"isAdvanced"}}),t.isAdvanced?a("div",[a("CVslider",{attrs:{name:"Exposure",min:0,max:100},on:{input:function(e){return t.handleData("exposure")}},model:{value:t.pipeline.exposure,callback:function(e){t.$set(t.pipeline,"exposure",e)},expression:"pipeline.exposure"}}),a("CVslider",{attrs:{name:"Brightness",min:0,max:100},on:{input:function(e){return t.handleData("brightness")}},model:{value:t.pipeline.brightness,callback:function(e){t.$set(t.pipeline,"brightness",e)},expression:"pipeline.brightness"}}),-1!==t.pipeline.gain?a("CVslider",{attrs:{name:"Gain",min:0,max:100},on:{input:function(e){return t.handleData("gain")}},model:{value:t.pipeline.gain,callback:function(e){t.$set(t.pipeline,"gain",e)},expression:"pipeline.gain"}}):t._e(),a("CVselect",{attrs:{name:"FPS",list:t.stringFpsList},on:{input:t.changeFps},model:{value:t.pipeline.videoModeIndex,callback:function(e){t.$set(t.pipeline,"videoModeIndex",e)},expression:"pipeline.videoModeIndex"}})],1):t._e()],1):t._e()],1),a("v-snackbar",{attrs:{top:"",color:t.snackbar.color},model:{value:t.snack,callback:function(e){t.snack=e},expression:"snack"}},[a("span",[t._v(t._s(t.snackbar.text))])])],1)},n=[],s=i("8384"),o=i("9696"),r=i("1447"),l={name:"CameraSettings",components:{CVselect:s["a"],CVnumberinput:o["a"],CVslider:r["a"]},data(){return{isCalibrating:!1,resolutionIndex:void 0,calibrationModeButton:{text:"Start Calibration",color:"green"},cancellationModeButton:{text:"Cancel Calibration",color:"red"},snackbar:{color:"success",text:""},squareSize:1,snapshotAmount:0,hasEnough:!1,snack:!1,isAdvanced:!1}},methods:{handleData(t){this.handleInput(t,this.pipeline[t])},changeFps(){this.handleInput("videoModeIndex",this.filteredFpsList[this.pipeline["videoModeIndex"]]["actualIndex"])},sendCameraSettings(){const t=this;this.axios.post("http://"+this.$address+"/api/settings/camera",this.cameraSettings).then((function(e){200===e.status&&(t.$store.state.saveBar=!0)}))},sendCalibrationMode(){const t=this;let e={},i="/api/settings/";!0===t.isCalibrating?i+="snapshot":(i+="startCalibration",e["resolution"]=this.filteredResolutionList[this.resolutionIndex].actualIndex,e["squareSize"]=this.squareSize,t.hasEnough=!1),this.axios.post("http://"+this.$address+i,e).then((function(e){200===e.status&&(t.isCalibrating?(t.snapshotAmount=e.data["snapshotCount"],t.hasEnough=e.data["hasEnough"],!0===t.hasEnough&&(t.cancellationModeButton.text="Finish Calibration",t.cancellationModeButton.color="green")):(t.calibrationModeButton.text="Take Snapshot",t.isCalibrating=!0))}))},sendCalibrationFinish(){const t=this;let e="/api/settings/endCalibration",i={};i["squareSize"]=this.squareSize,t.axios.post("http://"+this.$address+e,i).then(e=>{200===e.status&&(t.snackbar={color:"success",text:"calibration successful. \naccuracy: "+e.data["accuracy"].toFixed(5)},t.snack=!0),t.isCalibrating=!1,t.hasEnough=!1,t.snapshotAmount=0,t.calibrationModeButton.text="Start Calibration",t.cancellationModeButton.text="Cancel Calibration",t.cancellationModeButton.color="red"}).catch(()=>{t.snackbar={color:"error",text:"calibration failed"},t.snack=!0,t.isCalibrating=!1,t.hasEnough=!1,t.snapshotAmount=0,t.calibrationModeButton.text="Start Calibration",t.cancellationModeButton.text="Cancel Calibration",t.cancellationModeButton.color="red"})}},computed:{checkResolution(){return void 0===this.resolutionIndex},checkCancelation(){return!this.isCalibrating&&(this.checkResolution,!0)},currentCameraIndex:{get(){return this.$store.state.currentCameraIndex},set(t){this.$store.commit("currentCameraIndex",t)}},cameraList:{get(){return this.$store.state.cameraList},set(t){this.$store.commit("cameraList",t)}},filteredResolutionList:{get(){let t=[];for(let e in this.$store.state.resolutionList){let i=JSON.parse(JSON.stringify(this.$store.state.resolutionList[e]));t.some(t=>t.width===i.width&&t.height===i.height)||(i["actualIndex"]=parseInt(e),t.push(i))}return t}},filteredFpsList(){let t=this.$store.state.resolutionList[this.resolutionIndex],e=[];for(let i in this.$store.state.resolutionList){let a=JSON.parse(JSON.stringify(this.$store.state.resolutionList[i]));e.some(t=>t["fps"]===a["fps"])||a.width===t.width&&a.height===t.height&&(a["actualIndex"]=parseInt(i),e.push(a))}return e},stringFpsList(){let t=[];for(let e of this.filteredFpsList)t.push(e["fps"]);return t},stringResolutionList:{get(){let t=[];for(let e of this.filteredResolutionList)t.push(`${e["width"]} X ${e["height"]}`);return t}},cameraSettings:{get(){return this.$store.state.cameraSettings},set(t){this.$store.commit("cameraSettings",t)}},pipeline(){return this.$store.state.pipeline}}},c=l,u=i("2877"),h=i("6544"),d=i.n(h),p=i("8336"),m=i("ac7c"),v=i("62ad"),b=i("ce7e"),g=i("0fd9"),f=i("2db4"),x=Object(u["a"])(c,a,n,!1,null,"49adc682",null);e["default"]=x.exports;d()(x,{VBtn:p["a"],VCheckbox:m["a"],VCol:v["a"],VDivider:b["a"],VRow:g["a"],VSnackbar:f["a"]})},5311:function(t,e,i){"use strict";var a=i("5607"),n=i("2b0e");e["a"]=n["a"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(t={}){return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange(){}}})},"66a3":function(t,e,i){t.exports=i.p+"img/chessboard.f921ac6e.png"},"6ca7":function(t,e,i){},9696:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-row",{attrs:{dense:"",align:"center"}},[i("v-col",{attrs:{cols:2}},[i("span",[t._v(t._s(t.name))])]),i("v-col",[i("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"70px"},attrs:{dark:"","hide-details":"","single-line":"",type:"number",step:t.step},model:{value:t.localValue,callback:function(e){t.localValue=e},expression:"localValue"}})],1)],1)],1)},n=[],s={name:"NumberInput",props:["name","value","step"],data(){return{}},computed:{localValue:{get(){return this.value},set(t){this.$emit("input",parseFloat(t))}}}},o=s,r=i("2877"),l=i("6544"),c=i.n(l),u=i("62ad"),h=i("0fd9"),d=i("8654"),p=Object(r["a"])(o,a,n,!1,null,"7cb31fe1",null);e["a"]=p.exports;c()(p,{VCol:u["a"],VRow:h["a"],VTextField:d["a"]})},ac7c:function(t,e,i){"use strict";i("6ca7"),i("ec29");var a=i("9d26"),n=i("c37a"),s=i("fe09");e["a"]=s["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data(){return{inputIndeterminate:this.indeterminate}},computed:{classes(){return{...n["a"].options.computed.classes.call(this),"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate}},computedIcon(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState(){if(!this.disabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate(t){this.$nextTick(()=>this.inputIndeterminate=t)},inputIndeterminate(t){this.$emit("update:indeterminate",t)},isActive(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",{...this.attrs$,"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()}),this.genRipple(this.setTextColor(this.validationState)),this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon)])},genDefaultSlot(){return[this.genCheckbox(),this.genLabel()]}}})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";var a=i("c37a"),n=i("5311"),s=i("8547"),o=i("58df");e["a"]=Object(o["a"])(a["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"accent"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const t=this.value,e=this.internalValue;return this.isMultiple?!!Array.isArray(e)&&e.some(e=>this.valueComparator(e,t)):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,e):Boolean(e):this.valueComparator(e,this.trueValue)},isDirty(){return this.isActive}},watch:{inputValue(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel(){const t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:t=>{t.preventDefault(),this.onChange()}},t):t},genInput(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur(){this.isFocused=!1},onChange(){if(this.isDisabled)return;const t=this.value;let e=this.internalValue;if(this.isMultiple){Array.isArray(e)||(e=[]);const i=e.length;e=e.filter(e=>!this.valueComparator(e,t)),e.length===i&&e.push(t)}else e=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(e,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(e,t)?null:t:!e;this.validate(!0,e),this.internalValue=e,this.hasColor=e},onFocus(){this.isFocused=!0},onKeydown(t){}}})}}]);
//# sourceMappingURL=chunk-7d8e2978.07319db3.js.map