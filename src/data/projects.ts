export type Project = {
  id: string
  projectLabel: string
  role: string
  date: string
  src: string
  mobileSrc: string
  alt: string
  width: number
  height: number
  mobileWidth: number
  mobileHeight: number
  aspectRatio: string
  mobileAspectRatio: string
}

export const projects: Project[] = [
  {
    id: 'nokia',
    projectLabel: 'Nokia project',
    role: 'Product design',
    date: '2026',
    src: '/work/thumbnail-1.png',
    mobileSrc: '/work/thumbnail-1-mobile.png',
    alt: 'Nokia Cloud Operations Manager',
    width: 4096,
    height: 2090,
    mobileWidth: 1024,
    mobileHeight: 1024,
    aspectRatio: '4096 / 2090',
    mobileAspectRatio: '1 / 1',
  },
  {
    id: 'wise',
    projectLabel: 'Course & personal project',
    role: 'Product design',
    date: '2023',
    src: '/work/thumbnail-2.png',
    mobileSrc: '/work/thumbnail-2-mobile.png',
    alt: 'Wise',
    width: 4096,
    height: 2090,
    mobileWidth: 1024,
    mobileHeight: 1024,
    aspectRatio: '4096 / 2090',
    mobileAspectRatio: '1 / 1',
  },
  {
    id: 'wellness',
    projectLabel: 'Course work',
    role: 'Product design & business strategy',
    date: '2023',
    src: '/work/thumbnail-4.png',
    mobileSrc: '/work/thumbnail-4-mobile.png',
    alt: 'Sphere',
    width: 4096,
    height: 2090,
    mobileWidth: 1024,
    mobileHeight: 1024,
    aspectRatio: '4096 / 2090',
    mobileAspectRatio: '1 / 1',
  },
]
