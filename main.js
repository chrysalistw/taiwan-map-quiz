import "./d3/d3.min.js"

var svg = d3.select(document.getElementsByTagName("iframe")[0].contentDocument)
window.onload = function(){
	addClick()
	addZoom()
	addButtons()
}
function addClick(){
	svg.selectAll("path")
		.on("mouseover", e=>{
			e.target.setAttribute("fill","red")
		})
		.on("mouseout", e=>{
			e.target.setAttribute("fill","black")
		})
		.on("click", e=>{
			console.log(e.target.id)
			d3.select("div")
				.text(e.target.id)
		})
}
function addZoom(){
	svg.select("svg")
		.call(
			d3.zoom()
			.on("zoom", e=>{
				svg.select("g").attr("transform", e.transform)
			}, { passive : false })
		)
}
function addButtons(){
	d3.select("body").append("div")
		.text("DIV is here")
		.style("text-align", "center")
		.style("line-height", "100px")
		.style("font-size", "50px")
		.style("position", "absolute")
		.style("border", "2px solid #0FC")
		.style("border-radius", "25px")
		.style("background", "#0FC")
		.style("width", "30vw").style("height", "10vh")
		.style("min-width", "250px")
		.style("max-width", "500px")
		.style("max-height", "100px")
		.style("top", "10vh").style("left", "10vw")
		.on("click", e=>{console.log("meow")})
}
//svg.selectAll("g").on("mouseover", e=>{console.log("g over")})
//svg.selectAll("path").attr("fill", "red")
