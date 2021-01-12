import "./d3/d3.min.js"

fetch("COUNTY.svg")
	.then(res=>res.text())
	.then(text=>{
		document.querySelector("div").innerHTML = text
	})
	.then(()=>{
		addFeatures()
	})
var question = {
	q: "",
	a: "",
	check: function(){
		if(this.q===this.a){
			questioner()
			return true
		}
		return false
	}
}
function addFeatures(){
	addClick()
	addZoom()
	addButtons()
	questioner()
}
function questioner(){
	console.log("questioning...")
	//get all county names
	let names = Array(...document.getElementsByTagName("path")).map(e=>e.id)
	let rnd = names[Math.floor(Math.random()*names.length)]
	question.q = rnd
	d3.select("div#div").text(question.q)
}
function addClick(){
	d3.selectAll("path")
		.on("mouseover", e=>{
			e.target.setAttribute("fill","red")
		})
		.on("mouseout", e=>{
			e.target.setAttribute("fill","black")
		})
		.on("click", e=>{
			//d3.select("#div")
			//	.text(e.target.id)
			question.a = e.target.id
			if(question.check())
				console.log("you got it right")
			else
				console.log("wrong")
		})
}
function addZoom(){
	let k = 1.6
	let x = -150//200
	let y = 10//130
	d3.select("g").attr(
		"transform",
		d3.zoomIdentity
		.scale(k).translate(x,y)
	)
	d3.select("svg").call(
		d3.zoom()
		.on("zoom", e=>{
			d3.select("g").attr(
				"transform",
				e.transform
				.scale(k).translate(x,y)
			)
		})
	)
}
function addButtons(){
	d3.select("body").append("div")
		.attr("id", "div")
		.text("DIV")
		.style("text-align", "center")
		.style("line-height", "10vh")
		.style("font-size", "50px")
		.style("position", "fixed")
		.style("display", "block")
		.style("border", "2px solid #0FC")
		.style("border-radius", "25px")
		.style("background", "#0FC")
		.style("width", "25vw").style("height", "10vh")
		.style("min-width", "250px")
		.style("max-width", "500px")
		.style("max-height", "100px")
		.style("left", "8vh")
		.style("top", "15%")
		.style("margin", "auto 0")
}
