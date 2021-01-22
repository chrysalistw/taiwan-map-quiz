import "./d3/d3.min.js"

function fetchFile(filename){
	fetch(filename)
		.then(res=>res.text())
		.then(text=>{
			document.querySelector("div").innerHTML = text
		})
		.then(()=>{
			d3.selectAll("path")
				.attr("fill", fill)
				.attr("stroke", stroke)
				.attr("stroke-width", "0.1")
			addFeatures()
		})
}

export default fetchFile
