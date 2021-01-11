import "./d3/d3.min.js"

fetch("COUNTY.svg")
	.then(res=>res.text())
	.then(text=>{
		document.querySelector("div").innerHTML = text
	})
	.then(()=>{
		addFeatures()
	})
//var svg = d3.select(document.getElementsByTagName("iframe")[0].contentDocument)
function addFeatures(){
	addClick()
	addZoom()
	addButtons()
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
			d3.select("#div")
				.text(e.target.id)
		})
}
function addZoom(){
	console.log(d3.select("svg"))
	d3.select("#map").call(
		d3.zoom()
		.on("zoom", e=>{
			d3.select("svg").attr("transform", e.transform)
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
