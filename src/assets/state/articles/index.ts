import IArticle from "./article";

import article1 from "./1";
import article2 from "./2";

export default [
	{ 
		filename: "1", 
		article: article1 
	},
	{ 
		filename: "2", 
		article: article2 
	}
] as { filename: string; article: IArticle }[];