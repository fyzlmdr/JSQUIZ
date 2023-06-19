const quiz=new Quiz(sorular);
const ui=new UI();
ui.btn_start.addEventListener("click",function(){
   ui.quiz_box.classList.add("active");
   startTime(10);
   startTimeLine();
   ui.soruGoster(quiz.soruGetir());
   ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length);
   ui.next_btn.classList.remove("show");

})
ui.next_btn.addEventListener("click", function() {
   if (quiz.sorular.length != quiz.soruIndex + 1) {
       quiz.soruIndex += 1;
       clearInterval(counter);
       clearInterval(counterLine);
       startTime(10);
       startTimeLine();
       ui.soruGoster(quiz.soruGetir());
       ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length);
       ui.next_btn.classList.remove("show");
   } else {
       clearInterval(counter);
       clearInterval(counterLine);
     //  ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length,quiz.dogruSayisi);
        
   }
});
ui.btn_quit.addEventListener("click",function(){
    window.location.reload();
});

ui.btn_replay.addEventListener("click",function(){
    quiz.soruIndex=0;
    quiz.dogruSayisi=0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
});

function optionSelected(option) {
    clearInterval(counter);
   let cevap = option.querySelector("span b").textContent;
   let soru = quiz.soruGetir();

   if(soru.cevabiKontrolEt(cevap)) {
       quiz.dogruSayisi+=1;
       option.classList.add("correct");
       option.insertAdjacentHTML("beforeend",ui.correctIcon);
   } else {
       option.classList.add("incorrect");
       option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
   }

   for(let i=0; i < ui.option_list.children.length; i++) {
       ui.option_list.children[i].classList.add("disabled");
   }

   ui.next_btn.classList.add("show");
}
let counter;
function startTime(time){
    counter=setInterval(timer,1000);
    function timer(){
        ui.time_second.textContent=time;
        time--;
        if(time<0){
            clearInterval(counter);
            ui.time_text.textContent="Süre bitti";
            let cevap=quiz.soruGetir().dogruCevap;

            for(let option of ui.option_list.children){
                if(option.querySelector("span b").textContent==cevap){
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend",ui.correctIcon);
                }
                option.classList.add("disabled");

            }
            ui.next_btn.classList.add("show");
        }

    }

}
let counterLine;
function startTimeLine(){
    let line=0;
    counterLine=setInterval(time,100);
    function time(){
        line+=5;
        ui.time_line.style.width=line+"px";

        if(line>=550){
            clearInterval(counterLine);

        }

    }


}