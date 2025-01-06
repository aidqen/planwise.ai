import { motion } from 'framer-motion';

export function Loading() {

    return <div className="flex items-center justify-center min-h-[80vh]">
        <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <motion.div
                    className="mx-auto w-16 h-16"
                    animate={{
                        rotate: 360,
                        borderRadius: ["25%", "50%", "25%"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 mx-auto w-16 h-16"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{
                        opacity: 0,
                        scale: 1.5,
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                >
                    <div className="w-full h-full rounded-lg bg-blue-500/20" />
                </motion.div>
            </div>

            <div className="space-y-3">
                <motion.h3
                    className="text-xl font-medium text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Loading your schedule...
                </motion.h3>
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="mx-auto h-2 bg-gray-200 rounded"
                            style={{ width: ['60%', '45%', '30%'][i] }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    </div>
}