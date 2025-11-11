import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Some of our happy clients</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/stepfortree.avif"
                                    alt="Nvidia Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/teachme copy.svg"
                                    alt="Column Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/Frame.svg"
                                    alt="GitHub Logo"
                                    height="28"
                                    width="auto"
                                />
                               
                            </div>
                           
                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/Group 4 (2).svg"
                                    alt="Nike Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/logo.11428e31.png"
                                    alt="Lemon Squeezy Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/Screenshot-2025-01-13-162434.png"
                                    alt="Laravel Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/full-logo.svg"
                                    alt="Lilly Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>

                            {/* <div className="flex">
                                <img
                                    className="mx-auto h-9 w-fit dark:invert"
                                    src="/images/services/app icon.svg"
                                    alt="OpenAI Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div> */}
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
