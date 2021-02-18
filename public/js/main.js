
let sendEmailurl="https://easyshare-file-sharing-app.herokuapp.com/api/files/send";
let uploadUrl="https://easyshare-file-sharing-app.herokuapp.com/api/files/";

const dropZone = document.querySelector(".ev_share_container");
const inputfile = document.querySelector("#inputfile");
const browsefile = document.querySelector("#browsefile");
const filename = document.querySelector("#filename");
const copy_text = document.querySelector("#copy_text");
const copy_icon = document.querySelector("#copy_icon");
const text_copied = document.querySelector(".text_copied");
const copy_link = document.querySelector(".copy_link");
const upload_bar = document.querySelector(".upload_bar");
const mini_bar = document.querySelector(".mini_bar");
const inner_upload_bar = document.querySelector(".inner_upload_bar");
const bottom_wrapper = document.querySelector(".bottom_wrapper");
const emailform = document.querySelector("#emailform");

copy_icon.addEventListener("click",(req,res)=>{
    copy_text.select();
    document.execCommand("copy");
    
    miniPopup('Link Copied');
})
dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    dropZone.classList.add("dragged");
});

dropZone.addEventListener("dragleave",(e)=>{
   dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
    
   e.preventDefault();
   dropZone.classList.remove("dragged");
   let files= e.dataTransfer.files;
   if(files.length)
   {
    inputfile.files= files;
    
   }
   sendRequest(files);
});

inputfile.addEventListener("change",(e)=>{
    
    e.preventDefault();
    dropZone.classList.remove("dragged");
    let files= e.target.files;
    if(files.length)
    {
     inputfile.files= files;
     
    }
    sendRequest(files);
 });

browsefile.addEventListener("click",()=>{
    inputfile.click();
    
});



function sendRequest(files) {
   const formData = new FormData()
   formData.append('myfile', files[0]);
   let request = new XMLHttpRequest();
   request.open('POST', uploadUrl); 

request.upload.addEventListener('progress', function(e) {
	let percent_completed = Math.round((e.loaded / e.total)*100);
	upload_bar.style.display="block";
    document.querySelector("#percentage_text").innerText=`${percent_completed}% Completed`;
    
    inner_upload_bar.style.width=`${percent_completed}%`;
    mini_bar.style.width=`${percent_completed}%`;
});

request.addEventListener('load', function(e) {
	res = request.response;
    showlink(res);
});

// send POST request to server
request.send(formData);

  }

  let popupTime;
  function miniPopup(msg)
  {
    text_copied.innerText=msg;
    text_copied.classList.add("active")
    
    clearTimeout(popupTime)
    
    popupTime = setTimeout(()=>{
        text_copied.classList.remove("active")
    },1000)
  }

  function showlink(res)
  {
    upload_bar.style.display="none";
    bottom_wrapper.style.display="block";
    copy_text.value=JSON.parse(res).files;

  
  }

  emailform.addEventListener("submit",(e)=>{
    const uuid = JSON.parse(res).files.split("/").splice(-1)[0];
      e.preventDefault();
      
      const formData= {
        uuid:uuid,
        sendfrom:emailform.elements['sender'].value,
        sendto:emailform.elements['receiver'].value
        }

        fetch(sendEmailurl,{
            method:"POST",
            headers: {
                "Content-type":"application/json",
            },
            body: JSON.stringify(formData)
        }).then(data=>{
            return data.json();
        }).then(res=>{
            if(res.success)
            {
                bottom_wrapper.style.display="none";
                miniPopup("Email Sent Successfully");
                inputfile.files="";
            }
        })
  });