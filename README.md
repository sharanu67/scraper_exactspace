# DevOps Scraper Project

Step-1
*1st i have created the files like Dockerfile, server.py, scrape.js, package.json, requirement with help of touch command or vim commnad

Step-2
*written the script in yaml format in every file as per the instruction given in the assignment with VIM Editor.

Step-3
## Build the Docker Image
docker build --build-arg SCRAPE_URL=https://example.com -t devops-scraper .

Step-4
## Run the Docker Image, now container will run at port http://localhost:5000
docker run -p 5000:5000 devops-scraper

Step-5
*when i hit the https://localhost:5000 in the browser, It will display the output in json format like this
{
  "title": "Example Domain",
  "heading": "Example Domain"
}


