function addGA(){
	var loader = document.createElement("script")
	loader.async = true
	loader.src = "https://www.googletagmanager.com/gtag/js?id=G-P6VSM1DTN4"
	document.head.prepend(loader)
	
	var script = document.createElement("script")
	script.innerText = "\
		window.dataLayer = window.dataLayer || [];\
		function gtag(){dataLayer.push(arguments);}\
		gtag('js', new Date());\
		\
		gtag('config', 'G-P6VSM1DTN4');\
	"
	loader.after(script)
}

addGA()
