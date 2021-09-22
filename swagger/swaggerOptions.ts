

export const options= {
	definition: {
		openapi : "3.0.0",
		info: {
			title: "Music API",
			version: "1.0.0",
			description : "A single library API",
		},
		version:"1.0.0",
		servers: [
			{
				url: "http://localhost:5300/docs",
			},
		],
        
	},
	apis: ["./src/*.ts", ],
};