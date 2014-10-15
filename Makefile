JS_SPECS = $(wildcard */spec.js)
JS_RUNSPEC = $(JS_SPECS:%.js=%.js.run)

%.js.run: %.js
	node $^

specs: $(JS_RUNSPEC)
