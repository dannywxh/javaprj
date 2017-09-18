{
	"default" : {
		"ps" : [
				"org.cox.mvc.impl.processor.UpdateRequestAttributesProcessor", 
				"org.cox.mvc.impl.processor.EncodingProcessor", 
				"com.skynet.watchdog.log.SkynetLogProcess",
				"org.cox.mvc.impl.processor.ModuleProcessor", 
				"org.cox.mvc.impl.processor.ActionFiltersProcessor", 
				"org.cox.mvc.impl.processor.AdaptorProcessor", 
				"org.cox.mvc.impl.processor.MethodInvokeProcessor", 
				"org.cox.mvc.impl.processor.ViewProcessor"
		],
		"error" : "org.cox.mvc.impl.processor.FailProcessor"
	}
}