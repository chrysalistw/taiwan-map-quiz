import "./d3/d3.min.js"

var svg = d3.select(document.getElementsByTagName("iframe")[0].contentDocument)
window.onload = function(){
		svg.selectAll("path")
			.on("mouseover", e=>{
				e.target.setAttribute("fill","red")
			})
			.on("mouseout", e=>{
				e.target.setAttribute("fill","black")
			})
		svg.select("svg")
			.call(
				d3.zoom()
				.on("zoom", e=>{
					svg.select("g").attr("transform", e.transform)
				}, { passive : false })
			)
}
//svg.selectAll("g").on("mouseover", e=>{console.log("g over")})
//svg.selectAll("path").attr("fill", "red")
