const GradientWrapper = ({ children, ...props }) => (
    <div
        {...props}
        className={`relative ${props.className || ""}`}>
        <div className={`absolute m-auto blur-[160px] ${props.wrapperClassName || ""}`}
            style={{
                background:
                    "linear-gradient(180deg, #2563EB 0%, rgba(59, 130, 246, 0.984375) 0.01%, rgba(96, 165, 250, 0.2) 100%)",
            }}>

        </div>
        <div className="relative">
            {children}
        </div>
    </div>
)

export default GradientWrapper