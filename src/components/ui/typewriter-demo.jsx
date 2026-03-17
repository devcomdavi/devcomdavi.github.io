import { Typewriter } from "@/components/ui/typewriter-text"

const TypewriterDemo = () => {
    return (
        <>
            <Typewriter
                text={["Davi Holanda", "Desenvolvedor de Software", "Sistemas para Internet"]}
                speed={100}
                loop={true}
                className="text-xl font-medium"
            />
        </>
    )
}

export { TypewriterDemo }
