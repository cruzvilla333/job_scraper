import puppeteer from "puppeteer";
import express from 'express';
import cors from 'cors';

const scrape = async (jobTitle) => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        defaultViewport: null,
        devtools: true,
        timeout: 600000
    });

    const page = await browser.newPage();

    const url = 'https://careers.chewy.com/us/en'

    await page.goto(url)

    await page.waitForSelector("#keywordSearch", { visible: true });

    await page.type("#keywordSearch", jobTitle);

    await page.evaluate(() => {
        const floatingSuggestions = document.querySelector(".phs-keyword-suggestions");
        if (floatingSuggestions) {
            floatingSuggestions.style.display = 'none';
        }
    });

    await page.click("#ph-search-backdrop");
    await page.waitForNavigation({
        waitUntil: 'load'
    })

    const jobs = await page.evaluate(() => {
        const jobs = document.querySelectorAll(".jobs-list-item");
        const jobInformation = []
        jobs.forEach(job => {
            const jobTitle = job.querySelector('.job-title span')?.textContent ?? 'Not found';
            const jobLocation = job.querySelector('.job-location')?.textContent?.replace('Location', '')?.trim() ?? 'Not found';
            jobInformation.push({jobTitle, jobLocation});
        })
        return jobInformation;
    })
    await browser.close();
    return jobs;
};

const app = express();
app.use(cors());
const port = 8080;

app.get('/get-jobs', async (req, res) => {
    const jobTitle = req.query.jobTitle || '';  // Accept location via query string (default empty string)

    if (!jobTitle) {
        return res.status(400).json({ error: 'Job title is required' });
    }

    try {
        const jobs = await scrape(jobTitle);

        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found' });
        }

        return res.json({ jobs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error occurred while scraping jobs' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});