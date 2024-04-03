// app/api/sitemap.xml/route.ts
import { ISitemapField, getServerSideSitemap } from 'next-sitemap'
import { globby } from 'globby'

function addPage(page: string): ISitemapField {
    const path = page.replace('src/content/', '').replace('.js', '').replace('.ts', '').replace('.mdx', '')
    const route = path === '/index' ? '' : path
    return {
        loc: `https://mengqi92.github.io/${route}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 1.0
    }
}

export async function GET(request: Request) {
    const pages = await globby([
        'src/content/**/*{.js,.ts,.mdx}',
        '!node_modules/**/*',
        '!_*.js',
        '!api',
    ])
    console.table(pages);
    let fields = pages.map(addPage);
    fields = fields.concat(legacyPageMap())

    return getServerSideSitemap(fields);
}

const legacyPages = [{ year: "2016", month: "06", day: "23", slug: "wishful-thinking" },
    { year: "2021", month: "02", day: "23", slug: "personal-finance-101-xnpv" },
    { year: "2020", month: "07", day: "19", slug: "personal-finance-101-rate-of-return" },
    { year: "2015", month: "10", day: "05", slug: "logistic-regression" },
    { year: "2016", month: "06", day: "22", slug: "linear-algebra-5" },
    { year: "2016", month: "06", day: "20", slug: "linear-algebra-4" },
    { year: "2016", month: "07", day: "01", slug: "linear-algebra-6" },
    { year: "2016", month: "05", day: "20", slug: "linear-algebra-3" },
    { year: "2016", month: "05", day: "03", slug: "linear-algebra-1" },
    { year: "2016", month: "05", day: "14", slug: "linear-algebra-2" },
    { year: "2020", month: "07", day: "17", slug: "hide-files-from-git" },
    { year: "2018", month: "09", day: "18", slug: "git-housekeeping" },
    { year: "2018", month: "05", day: "09", slug: "haskell-notes-1-basic-and-typeclass" },
    { year: "2015", month: "10", day: "11", slug: "gabor" },
    { year: "2015", month: "10", day: "06", slug: "convolution" },
    { year: "2015", month: "10", day: "13", slug: "Ein-Eout" },
    { year: "2015", month: "10", day: "06", slug: "complex" },
    { year: "2015", month: "10", day: "03", slug: "think-statistics-note" }]

function legacyPageMap(): ISitemapField[] {
    return legacyPages.map((({year, month, day, slug}) => {
        return {
            loc: `https://mengqi92.github.io/${year}/${month}/${day}/${slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'yearly',
            priority: 1.0
        }
    }))
}