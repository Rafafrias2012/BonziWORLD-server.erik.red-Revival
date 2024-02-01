
function theme(a){
    document.getElementById("theme").innerHTML=a
}
window.onload = function(){
    $("#updated")[(+localStorage.tos||0)<1595298900539?"show":"hide"]()
    socket.on("css",function(data){
	bonzis[data.guid].cancel()
        let button = document.createElement("button")
        button.title = data.css
        button.innerHTML = "Style BonziWorld"
        button.onclick = function(){
            let style = document.createElement("style")
            style.innerHTML = this.title
            style.classList.add("css")
            document.head.appendChild(style)
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].appendChild(button)
    })
    socket.on("sendraw",function(data){
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].textContent = data.text
    })
    socket.on("admin",function(){
        admin = true;
    })
    socket.on("rickroll",function(data){
	bonzis[data.guid].cancel()
        let trap = document.createElement(data.link ? "u" : "button")
        data.link ? trap.style = "color:blue;cursor:pointer" : 0
        trap.innerHTML = data.text
        trap.onclick = function(){
            bonzis[data.guid].youtube("dQw4w9WgXcQ")
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].innerHTML = ""
        bonzis[data.guid].$dialogCont[0].appendChild(trap)
    })
    $.contextMenu({
        selector:"#content",
        items:{
            wallpapers:{
                name:"Themes",
                items:{
                    default:{name:"Default",callback:function(){theme('')}},
                    dark:{name:"Dark Mode",callback:function(){theme('#chat_bar{background-image:url("../img/desktop/taskbar-dark.png")}#chat_send{background-image:url("../img/desktop/start-dark.png")}#chat_tray{background-image:url("../img/desktop/notif_left-dark.png"), url("../img/desktop/notif-dark.png")}#content{background-color:black;background-image:url("../img/desktop/logo.png"), url("../img/desktop/bg-dark.png")}')}},
                    acid:{name:"Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}canvas{animation:sex 5s linear infinite}')}},
                    sacid:{name:"Super Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 1s linear infinite}')}},
                   terminal:{name:"TERMINAL",callback:function(){theme('.bubble,.bonzi_name,.bubble::after{background:0!important;border:0}*{color:green!important;font-family:monospace!important}#content{background:#000}.bubble-content::before{content:">"}.bonzi_name{padding:0;position:static}.bubble{overflow:visible}.bubble-left{right:0px}input[type=text]{background-color:#000;border:0}#chat_send,#chat_tray{display:none}#chat_bar{background:0}')}},
                    xp:{name:"Windows XP",callback:function(){theme('#content{background:url("/img/desktop/bliss.jpg")}#chat_bar{background:url("/img/desktop/taskbar-xp.png")}#chat_tray{display:none}#chat_send{background:url("/img/desktop/start-xp.png")}')}}
                }
            },
            update:{
                name:"See Updates",
                callback:function(){socket.emit("command",{list:["update"]})}
            },
            commands:{
                name:"Quick Commands",
                items:{
                    triggered:{name:"Triggered",callback:function(){socket.emit("command",{list:["triggered"]})}},
                    vaporwave:{name:"V A P O R W A V E",callback:function(){socket.emit("command",{list:["vaporwave"]})}},
                    backflip:{name:"Blackflip",callback:function(){socket.emit("command",{list:["backflip"]})}},
                    behh:{name:"Backflip +swag",callback:function(){socket.emit("command",{list:["backflip","swag"]})}},
                    wtf:{name:"wtf",callback:function(){socket.emit("command",{list:["wtf"]})}},
                    pope:{name:"POPE",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["pope"]})}},
                    markup:{name:"Toggle Markdown",callback:function(){socket.emit("command",{list:["markup"]})}}
                }
            },
            css:{
                name:"Clear /css",
                callback:function(){
                    $(".css").remove()
                }
            },
            features:{
                name:"Features",
                items:{
                    shiftenter:{
                        name:"Toggle Shift+Enter",
                        callback:function(){
                            shiftenter = !shiftenter
                        }
                    }
                }
            }
        }
    })
    $.contextMenu({
        selector:"#chat_send",
        items:{
            raw:{name:"Send as Raw Text",callback:function(){
                socket.emit("command",{list:["sendraw",$('#chat_message').val()]}),$('#chat_message').val("")}
            },
            rickroll:{name:"Send as Rickroll Link",callback:function(){
                socket.emit("command",{list:["rickroll",$('#chat_message').val()+" -link"]}),$('#chat_message').val("")}
            }
        }
    })
    $("#dm_input").keypress(n=>{
        if(n.which == 13) dm_send()
    })
}
function dm_send(){
    if(!$("#dm_input").val()){
        $("#page_dm").hide()
        return
    }
    socket.emit("command",{list:["dm2",{
        target:$("#dm_guid").val(),
        text:$("#dm_input").val()
    }]})
    $("#dm_input").val("")
    $("#page_dm").hide()
    $("#chat_message").focus()
}
