
document.getElementById("submitquery").addEventListener("click",function()
{
  let fname=document.getElementById("fname").value;
  document.getElementById("displaythank").innerHTML=`Thank You ${fname},we will answer your query soon`;
})
