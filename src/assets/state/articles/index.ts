import IArticle from "./article";

import article1 from "./1";
import article2 from "./2";
import article3 from "./3";

export default [
	{ 
		filename: "1", 
		article: article1 
	},
	{ 
		filename: "2", 
		article: article2 
	},
	{ 
		filename: "3", 
		article: article3 
	}
] as { filename: string; article: IArticle }[];