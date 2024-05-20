interface WebData{
    title: string,
    description: string
}

export const webData: WebData = {
    title: 'FoodHub',
    description: 'Your Culinary Adventure Awaits!'
}

interface NavbarLink{
    text: string,
    link: string 
}

export const navbarLinks: NavbarLink[] = [
    {
        text: "Home",
        link: "/"
    },
    {
        text: "Menu",
        link: "/menu"
    },
    {
        text: "Our Services",
        link: "/events"
    },
    {
        text: "Contact",
        link: "#contact"
    }
]

interface WebContent{
    text1: string,
    text2: string,
    text3: string,
    text4: string,
    text5: string,
    text6: string,
    text7: string,
    text8: string,
    text9: string,
    text10: string,
    text11: string,
    text12: string,
    text13: string,
    text14: string,
    text15: string,
    text16: string,
    text17: string,
    text18: string,
    text19: string,
    text20: string
}

export const contents: WebContent= {
    text1: 'Unleash your taste buds',
    text2: 'Your',
    text3: 'Culinary',
    text4: 'Adventure Awaits!',
    text5: 'More than just sustenance, food is a celebration of life. Let us guide you towards mindful and delicious meals.',
    text6: 'SIGN IN',
    text7: 'Top Categories',
    text8: 'ORDER NOW',
    text9: 'LEARN MORE',
    text10: 'Order anytime and enjoy the best food',
    text11: 'Craving comfort? We deliver hot meals from all your favorite restaurants. Skip the line, skip the dishes. Order now on FoodHub and fuel your happy place.',
    text12: 'EXPLORE MENU',
    text13: 'More than just sustenance, food is a celebration of life. Let us guide you towards mindful and delicious meals.',
    text14: 'What our customers say',
    text15: 'No more recipe struggles! Foodhub is my lifesaver. Easy search, delicious options (even for picky eaters!), and gorgeous photos. 5 stars!',
    text16: 'Rose Miller',
    text17: 'Food Lover',
    text18: 'Bestsellers',
    text19: 'From savory starters to indulgent desserts, explore diverse cuisines crafted by local chefs. Our user-friendly layout allows easy browsing and customization for a delightful dining experience at your fingertips',
    text20: 'Taste the best'
}

interface FooterLink{
    text: string,
    url: string,
}

export const footerLinks = [
    {
        heading: 'Support Team',
        links: [
            {
                text: 'Help Center',
                url: ''
            },
            {
                text: 'Tweet Us',
                url: ''
            },
            {
                text: 'Email',
                url: ''
            },
            {
                text: 'Customer Care',
                url: ''
            }
        ]
    },
    {
        heading: 'Links',
        links: [
            {
                text: 'Menu',
                url: ''
            },
            {
                text: 'Combos',
                url: ''
            },
            {
                text: 'Offers',
                url: ''
            },
            {
                text: 'Our Services',
                url: ''
            }
        ]
    },
    {
        heading: 'Contact us',
        links: [
            {
                text: 'contact@foodhub.com',
                url: ''
            },
            {
                text: '+91 89748 63731',
                url: ''
            },
        ]
    }
]


interface Category{
    name: string,
    icon: string,
    redirect: string
}

export const categories: Category[]= [
    {
        name: 'Italian',
        icon: '/icons/italian.png',
        redirect: '/',
    },
    {
        name: 'Indian',
        icon: '/icons/indian.png',
        redirect: '/',
    },
    {
        name: 'Chinese',
        icon: '/icons/chinese.png',
        redirect: '/',
    },
    {
        name: 'Japanese',
        icon: '/icons/japanese.png',
        redirect: '/',
    },
]

interface Socials{
    instagram: string,
    facebook: string,
    twitter: string
}

export const socials: Socials = {
    instagram: '',
    facebook: '',
    twitter: ''
}

interface SampleFoodItem{
    name: string,
    price: number,
    image: string,
    qty: number
}

export const sampleFoodItems: SampleFoodItem[]= [
    {
        name: 'Italian',
        price: 20,
        image: '/images/foodreviews.png',
        qty: 2
    },
    {
        name: 'Italian',
        price: 20,
        image: '/images/foodreviews.png',
        qty: 2
    },
    {
        name: 'Italian',
        price: 20,
        image: '/images/foodreviews.png',
        qty: 2
    },
    {
        name: 'Italian',
        price: 20,
        image: '/images/foodreviews.png',
        qty: 2
    },
]