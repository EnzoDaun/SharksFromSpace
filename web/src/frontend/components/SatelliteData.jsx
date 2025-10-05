"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Button, TextField, Typography, Paper, Stack, Container, CircularProgress } from "@mui/material"

export default function Home() {
    // Date selection state
    const [selectedDate, setSelectedDate] = useState("")
    const [appliedDate, setAppliedDate] = useState("")
    const [dateMessage, setDateMessage] = useState("")
    const [, setIsMounted] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    // AI Analysis state
    const [showAIPanel, setShowAIPanel] = useState(false)
    const [aiAnalysis, setAiAnalysis] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Satellite viewer state
    const [imageUrl, setImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [showTemperature, setShowTemperature] = useState(false)
    const [temperatureLayerUrl, setTemperatureLayerUrl] = useState("")
    const [temperatureLoading, setTemperatureLoading] = useState(false)
    const [showChlorophyll, setShowChlorophyll] = useState(false)
    const [chlorophyllLayerUrl, setChlorophyllLayerUrl] = useState("")
    const [chlorophyllLoading, setChlorophyllLoading] = useState(false)

    const containerRef = useRef(null)
    const imageRef = useRef(null)

    // Initialize date
    useEffect(() => {
        setIsMounted(true)
        const today = new Date().toISOString().split("T")[0]
        setSelectedDate(today)
        setAppliedDate(today)
    }, [])

    // Update image URLs when date changes
    useEffect(() => {
        if (!appliedDate) return

        // Base image URL (Terra True Color - continua usando NASA diretamente)
        const baseUrl = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?service=WMS&request=GetMap&version=1.3.0&layers=MODIS_Terra_CorrectedReflectance_TrueColor&styles=&format=image/jpeg&transparent=false&bbox=-180,-90,180,90&width=2048&height=2048&CRS=EPSG:4326&TIME=${appliedDate}`
        setImageUrl(baseUrl)

        // Temperature layer URL - usando API do backend
        const tempUrl = `http://localhost:3000/nasa/sst.png?time=${appliedDate}`
        setTemperatureLayerUrl(tempUrl)

        // Chlorophyll layer URL - usando API do backend
        const chloroUrl = `http://localhost:3000/nasa/chlorophyll.png?time=${appliedDate}`
        setChlorophyllLayerUrl(chloroUrl)
    }, [appliedDate])

    // Load image
    useEffect(() => {
        if (!imageUrl) return

        setIsLoading(true)
        setError(null)

        const img = new Image()
        const timeout = setTimeout(() => {
            setError("Timeout loading image. Please try another date.")
            setIsLoading(false)
        }, 30000)

        img.onload = () => {
            clearTimeout(timeout)
            setImageSize({ width: img.width, height: img.height })
            setIsLoading(false)
            setPosition({ x: 0, y: -75 })
        }

        img.onerror = () => {
            clearTimeout(timeout)
            setError("Error loading image. Please try another date.")
            setIsLoading(false)
        }

        img.src = imageUrl

        return () => clearTimeout(timeout)
    }, [imageUrl])

    const getMaxDate = () => new Date().toISOString().split("T")[0]

    const handleDateChange = (e) => setSelectedDate(e.target.value)

    const handleSearch = () => {
        setIsSearching(true)
        setAppliedDate(selectedDate)
        setDateMessage("")
        // Desativa as camadas quando uma nova data é pesquisada
        setShowTemperature(false)
        setShowChlorophyll(false)
        setTemperatureLoading(false)
        setChlorophyllLoading(false)
        setTimeout(() => setIsSearching(false), 1000)
    }

    const handleAIAnalysis = async () => {
        if (!showAIPanel) {
            setIsAnalyzing(true)
            setShowAIPanel(true)
            setAiAnalysis("") // Limpa o conteúdo anterior
            
            try {
                // TODO: Substituir por chamada real da API
                // const response = await fetch('/api/analyze-shark-probability', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         date: appliedDate,
                //         // outros parâmetros necessários
                //     })
                // });
                // 
                // if (!response.ok) {
                //     throw new Error('Erro na análise da IA');
                // }
                // 
                // const data = await response.json();
                // setAiAnalysis(data.htmlContent || data.analysis);
                
                // Simulação temporária - remover quando integrar com API real
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                setAiAnalysis(`
                    <section id="analise-tubaroes">
                      <header>
                        <h1>Risco de Presença de Tubarões — Clorofila-a + SST</h1>
                        <p class="escopo">Data analisada: ${appliedDate}. Fontes: imagens fornecidas (clorofila-a & SST).</p>
                      </header>
                      <section id="alto-risco">
                        <h2>Locais com Alto Risco</h2>
                        <ul>
                          <li><strong>Costa Oeste da América do Sul</strong> — ressurgência costeira com alta clorofila e SST adequada
                            <div class="pais">País(es) mais afetados: Peru, Chile</div>
                            <div class="justificativa"><em>Por quê:</em> clorofila alta + SST adequada; padrão consistente/contínuo; convergência/local de frente.</div>
                          </li>
                          <li><strong>Atlântico Noroeste</strong> — alta clorofila ao longo da Corrente do Golfo
                            <div class="pais">País(es) mais afetados: Estados Unidos</div>
                            <div class="justificativa"><em>Por quê:</em> clorofila alta + SST adequada; padrão consistente/contínuo; convergência/local de frente.</div>
                          </li>
                          <li><strong>Costa Sudoeste da África</strong> — ressurgência de Benguela com alta clorofila
                            <div class="pais">País(es) mais afetados: Namíbia, África do Sul</div>
                            <div class="justificativa"><em>Por quê:</em> clorofila alta + SST adequada; padrão consistente/contínuo; convergência/local de frente.</div>
                          </li>
                        </ul>
                      </section>
                      <section id="medio-risco">
                        <h2>Locais com Médio Risco</h2>
                        <ul>
                          <li><strong>Pacífico Equatorial Central</strong> — clorofila moderada e SST marginal
                            <div class="pais">País(es) potencialmente afetados: Kiribati</div>
                            <div class="justificativa"><em>Por quê:</em> clorofila moderada e/ou SST marginal; padrão menos estável.</div>
                          </li>
                          <li><strong>Mar de Java</strong> — clorofila moderada com SST marginal
                            <div class="pais">País(es) potencialmente afetados: Indonésia</div>
                            <div class="justificativa"><em>Por quê:</em> clorofila moderada e/ou SST marginal; padrão menos estável.</div>
                          </li>
                          <li><strong>Atlântico Sul (Zona de Convergência)</strong> — clorofila moderada
                            <div class="pais">País(es) potencialmente afetados: Brasil, Uruguai</div>
                            <div class="justificativa"><em>Por quê:</em> clorofila moderada e/ou SST marginal; padrão menos estável.</div>
                          </li>
                        </ul>
                      </section>
                      <section id="baixo-risco">
                        <h2>Locais com Baixo Risco</h2>
                        <ul>
                          <li><strong>Oceano Pacífico Central (Giros Subtropicais)</strong> — águas oligotróficas
                            <div class="justificativa"><em>Por quê:</em> clorofila muito baixa; SST fora da faixa ideal; águas oligotróficas.</div>
                          </li>
                          <li><strong>Oceano Índico Central</strong> — águas oligotróficas
                            <div class="justificativa"><em>Por quê:</em> clorofila muito baixa; SST fora da faixa ideal; águas oligotróficas.</div>
                          </li>
                          <li><strong>Atlântico Central (Giro Subtropical)</strong> — águas oligotróficas
                            <div class="justificativa"><em>Por quê:</em> clorofila muito baixa; SST fora da faixa ideal; águas oligotróficas.</div>
                          </li>
                        </ul>
                      </section>
                      <footer>
                        <p class="nota"><strong>Nota metodológica:</strong> Esta análise combina dados de clorofila-a (indicador de produtividade primária) e SST (temperatura da superfície do mar) para identificar áreas com maior probabilidade de presença de tubarões.</p>
                        <p class="nota"><strong>Limitações:</strong> Esta análise é baseada em dados de satélite e não considera outros fatores importantes como batimetria, correntes oceânicas, sazonalidade, e comportamento específico de espécies.</p>
                      </footer>
                    </section>
                `)
                
            } catch (error) {
                console.error('Erro ao buscar análise da IA:', error);
                setAiAnalysis(`
                    <div style="color: #ff6b6b; text-align: center; padding: 20px;">
                        <h3>❌ Erro na Análise</h3>
                        <p>Não foi possível obter a análise de IA no momento. Tente novamente.</p>
                        <p><small>Erro: ${error.message}</small></p>
                    </div>
                `);
            } finally {
                setIsAnalyzing(false)
            }
        } else {
            setShowAIPanel(false)
            setAiAnalysis("")
        }
    }

    const incrementDay = () => {
        const date = new Date(selectedDate)
        date.setDate(date.getDate() + 1)
        const maxDate = new Date(getMaxDate())
        if (date <= maxDate) {
            const newDate = date.toISOString().split("T")[0]
            setSelectedDate(newDate)
            setAppliedDate(newDate)
            setDateMessage("")
            // Desativa as camadas quando a data é alterada
            setShowTemperature(false)
            setShowChlorophyll(false)
            setTemperatureLoading(false)
            setChlorophyllLoading(false)
        }
    }

    const decrementDay = () => {
        const date = new Date(selectedDate)
        date.setDate(date.getDate() - 1)
        const newDate = date.toISOString().split("T")[0]
        setSelectedDate(newDate)
        setAppliedDate(newDate)
        setDateMessage("")
        // Desativa as camadas quando a data é alterada
        setShowTemperature(false)
        setShowChlorophyll(false)
        setTemperatureLoading(false)
        setChlorophyllLoading(false)
    }

    const incrementMonth = () => {
        const date = new Date(selectedDate)
        date.setMonth(date.getMonth() + 1)
        const maxDate = new Date(getMaxDate())
        if (date <= maxDate) {
            const newDate = date.toISOString().split("T")[0]
            setSelectedDate(newDate)
            setAppliedDate(newDate)
            setDateMessage("")
            // Desativa as camadas quando a data é alterada
            setShowTemperature(false)
            setShowChlorophyll(false)
            setTemperatureLoading(false)
            setChlorophyllLoading(false)
        }
    }

    const decrementMonth = () => {
        const date = new Date(selectedDate)
        date.setMonth(date.getMonth() - 1)
        const newDate = date.toISOString().split("T")[0]
        setSelectedDate(newDate)
        setAppliedDate(newDate)
        setDateMessage("")
        // Desativa as camadas quando a data é alterada
        setShowTemperature(false)
        setShowChlorophyll(false)
        setTemperatureLoading(false)
        setChlorophyllLoading(false)
    }

    const incrementYear = () => {
        const date = new Date(selectedDate)
        date.setFullYear(date.getFullYear() + 1)
        const maxDate = new Date(getMaxDate())
        if (date <= maxDate) {
            const newDate = date.toISOString().split("T")[0]
            setSelectedDate(newDate)
            setAppliedDate(newDate)
            setDateMessage("")
            // Desativa as camadas quando a data é alterada
            setShowTemperature(false)
            setShowChlorophyll(false)
            setTemperatureLoading(false)
            setChlorophyllLoading(false)
        }
    }

    const decrementYear = () => {
        const date = new Date(selectedDate)
        date.setFullYear(date.getFullYear() - 1)
        const newDate = date.toISOString().split("T")[0]
        setSelectedDate(newDate)
        setAppliedDate(newDate)
        setDateMessage("")
        // Desativa as camadas quando a data é alterada
        setShowTemperature(false)
        setShowChlorophyll(false)
        setTemperatureLoading(false)
        setChlorophyllLoading(false)
    }

    // Drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }

    const handleMouseUp = () => setIsDragging(false)

    const handleTouchStart = (e) => {
        const touch = e.touches[0]
        setIsDragging(true)
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y })
    }

    const handleTouchMove = (e) => {
        if (!isDragging) return
        const touch = e.touches[0]
        setPosition({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y })
    }

    const handleTouchEnd = () => setIsDragging(false)

    const handleWheel = (e) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -50 : 50
        setPosition((prev) => ({ x: prev.x, y: prev.y + delta }))
    }

    const handleToggleTemperature = () => {
        if (!showTemperature) {
            setTemperatureLoading(true)
            setShowTemperature(true)
        } else {
            setShowTemperature(false)
            setTemperatureLoading(false)
        }
    }

    const handleToggleChlorophyll = () => {
        if (!showChlorophyll) {
            setChlorophyllLoading(true)
            setShowChlorophyll(true)
        } else {
            setShowChlorophyll(false)
            setChlorophyllLoading(false)
        }
    }

    return (
        <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "transparent" }}>
            <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4, md: 6 }, minHeight: "100vh" }}>
                <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 3, sm: 4, md: 6, lg: 8 }}
                    alignItems="stretch"
                    justifyContent="center"
                >
                    {/* Left Sidebar - Date Selection */}
                    <Paper
                        elevation={8}
                        sx={{
                            width: { xs: "100%", lg: 320 },
                            background: "linear-gradient(135deg, rgba(33, 150, 243, 0.3), rgba(13, 71, 161, 0.3))",
                            backdropFilter: "blur(20px)",
                            borderRadius: { xs: 3, sm: 4 },
                            p: { xs: 3, sm: 4, md: 5 },
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        <Stack spacing={{ xs: 2, sm: 3 }}>
                            <Box>
                                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                                    🗓️ Select Date
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.95)" }}>
                                    Choose a date to view NASA satellite images from that specific day.
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" sx={{ color: "white", fontWeight: 600, mb: 1 }}>
                                    Date:
                                </Typography>
                                <TextField
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    inputProps={{ max: getMaxDate() }}
                                    disabled={isSearching}
                                    fullWidth
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: 2,
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#d8c5a8", borderWidth: 2 },
                                            "&:hover fieldset": { borderColor: "#c0a080" },
                                            "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Navigation Buttons */}
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" sx={{ color: "white", fontWeight: 600, minWidth: 50 }}>
                                        Day:
                                    </Typography>
                                    <Button
                                        onClick={decrementDay}
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #1976d2)",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        ← Prev
                                    </Button>
                                    <Button
                                        onClick={incrementDay}
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #1976d2)",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        Next →
                                    </Button>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" sx={{ color: "white", fontWeight: 600, minWidth: 50 }}>
                                        Month:
                                    </Typography>
                                    <Button
                                        onClick={decrementMonth}
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #1976d2)",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        ← Prev
                                    </Button>
                                    <Button
                                        onClick={incrementMonth}
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #1976d2)",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        Next →
                                    </Button>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" sx={{ color: "white", fontWeight: 600, minWidth: 50 }}>
                                        Year:
                                    </Typography>
                                    <Button
                                        onClick={decrementYear}
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #1976d2)",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        ← Prev
                                    </Button>
                                    <Button
                                        onClick={incrementYear}
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #1976d2)",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        Next →
                                    </Button>
                                </Stack>
                            </Stack>

                            <Button
                                onClick={handleSearch}
                                disabled={isSearching}
                                variant="contained"
                                fullWidth
                                sx={{
                                    background: "linear-gradient(90deg, #C04000, #ff5722)",
                                    py: { xs: 1.5, sm: 2 },
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                    fontWeight: 600,
                                    "&:hover": { transform: "scale(1.05)" },
                                }}
                            >
                                {isSearching ? (
                                    <>
                                        <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                                        Searching...
                                    </>
                                ) : (
                                    "🔍 Search Images"
                                )}
                            </Button>

                            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.95)", mt: "auto" }}>
                                💡 Tip: Drag the image to explore different regions of Earth!
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* Center - Map Container */}
                    <Paper
                        elevation={8}
                        sx={{
                            flex: 1,
                            maxWidth: { lg: 900 },
                            height: { xs: 400, sm: 500, md: 600, lg: "80vh" },
                            borderRadius: { xs: 3, sm: 4 },
                            overflow: "hidden",
                            border: "2px solid #d8c5a8",
                            position: "relative",
                        }}
                    >
                        {/* Satellite Viewer */}
                        <Box
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onWheel={handleWheel}
                            sx={{
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                position: "relative",
                                cursor: isDragging ? "grabbing" : "grab",
                                bgcolor: "black",
                            }}
                        >
                            {isLoading && (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ width: "100%", height: "100%", color: "white" }}
                                    spacing={2}
                                >
                                    <CircularProgress size={50} sx={{ color: "white" }} />
                                    <Typography>Loading Earth image...</Typography>
                                </Stack>
                            )}

                            {error && (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ width: "100%", height: "100%", color: "#ff6b6b", p: 3, textAlign: "center" }}
                                >
                                    <Typography>{error}</Typography>
                                </Stack>
                            )}

                            {!isLoading && !error && imageSize.width > 0 && (
                                <>
                                    <Box
                                        component="img"
                                        ref={imageRef}
                                        src={imageUrl}
                                        alt="NASA Earth View"
                                        draggable={false}
                                        sx={{
                                            width: "200%",
                                            height: "auto",
                                            position: "absolute",
                                            transform: `translate(${position.x}px, ${position.y}px)`,
                                            userSelect: "none",
                                        }}
                                    />

                                    {showTemperature && temperatureLayerUrl && (
                                        <Box
                                            component="img"
                                            src={temperatureLayerUrl}
                                            alt="Temperature Layer"
                                            draggable={false}
                                            onError={() => setTemperatureLoading(false)}
                                            onLoad={() => setTemperatureLoading(false)}
                                            sx={{
                                                width: "200%",
                                                height: "auto",
                                                position: "absolute",
                                                transform: `translate(${position.x}px, ${position.y}px)`,
                                                userSelect: "none",
                                                opacity: 0.7,
                                            }}
                                        />
                                    )}

                                    {showChlorophyll && chlorophyllLayerUrl && (
                                        <Box
                                            component="img"
                                            src={chlorophyllLayerUrl}
                                            alt="Chlorophyll Layer"
                                            draggable={false}
                                            onError={() => setChlorophyllLoading(false)}
                                            onLoad={() => setChlorophyllLoading(false)}
                                            sx={{
                                                width: "200%",
                                                height: "auto",
                                                position: "absolute",
                                                transform: `translate(${position.x}px, ${position.y}px)`,
                                                userSelect: "none",
                                                opacity: 0.7,
                                            }}
                                        />
                                    )}
                                </>
                            )}

                            {/* Layer Buttons */}
                            <Stack direction="row" spacing={1} sx={{ position: "absolute", bottom: 10, left: 10, zIndex: 10 }}>
                                <Button
                                    onClick={handleToggleTemperature}
                                    disabled={temperatureLoading}
                                    variant={showTemperature ? "contained" : "outlined"}
                                    sx={{
                                        bgcolor: showTemperature ? "#C04000" : "rgba(255, 255, 255, 0.9)",
                                        color: showTemperature ? "white" : "#C04000",
                                        borderColor: "#C04000",
                                        borderWidth: 2,
                                        fontWeight: 600,
                                        "&:hover": {
                                            bgcolor: showTemperature ? "#a03000" : "rgba(255, 255, 255, 1)",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    {temperatureLoading ? <CircularProgress size={16} sx={{ color: "white" }} /> : "🌡️ Temp"}
                                </Button>

                                <Button
                                    onClick={handleToggleChlorophyll}
                                    disabled={chlorophyllLoading}
                                    variant={showChlorophyll ? "contained" : "outlined"}
                                    sx={{
                                        bgcolor: showChlorophyll ? "#568203" : "rgba(255, 255, 255, 0.9)",
                                        color: showChlorophyll ? "white" : "#568203",
                                        borderColor: "#568203",
                                        borderWidth: 2,
                                        fontWeight: 600,
                                        "&:hover": {
                                            bgcolor: showChlorophyll ? "#467002" : "rgba(255, 255, 255, 1)",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    {chlorophyllLoading ? <CircularProgress size={16} sx={{ color: "white" }} /> : "🌿 Chloro"}
                                </Button>
                            </Stack>
                        </Box>

                        {/* AI Analysis Button */}
                        <Button
                            onClick={handleAIAnalysis}
                            variant="contained"
                            sx={{
                                position: "absolute",
                                top: { xs: 8, sm: 16 },
                                right: { xs: 8, sm: 16 },
                                background: showAIPanel
                                    ? "linear-gradient(90deg, #568203, #6a9c03)"
                                    : "linear-gradient(90deg, #C04000, #ff5722)",
                                fontWeight: 600,
                                zIndex: 100,
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            {isAnalyzing ? (
                                <>
                                    <CircularProgress size={16} sx={{ color: "white", mr: 1 }} />
                                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                                        Analyzing...
                                    </Box>
                                </>
                            ) : (
                                <>
                                    🤖{" "}
                                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" }, ml: 0.5 }}>
                                        {showAIPanel ? "Hide" : "AI Analysis"}
                                    </Box>
                                </>
                            )}
                        </Button>

                        {/* AI Analysis Panel */}
                        {showAIPanel && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: { xs: 200, sm: 250, md: 280 },
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(227, 242, 253, 0.98))",
                                    backdropFilter: "blur(20px)",
                                    borderTop: "3px solid #568203",
                                    p: { xs: 2, sm: 3, md: 4 },
                                    transition: "all 0.4s ease",
                                    zIndex: 99,
                                    overflowY: "auto",
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#568203", fontWeight: "bold", mb: 2 }}>
                                    📊 Artificial Intelligence Analysis
                                </Typography>
                                <Box
                                    sx={{ color: "grey.800", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                                    dangerouslySetInnerHTML={{ __html: aiAnalysis || "Click the button above to start analysis..." }}
                                />
                            </Box>
                        )}
                    </Paper>

                    {/* Right Sidebar - Project Info */}
                    <Paper
                        elevation={8}
                        sx={{
                            width: { xs: "100%", lg: 320 },
                            background: "linear-gradient(135deg, rgba(33, 150, 243, 0.3), rgba(13, 71, 161, 0.3))",
                            backdropFilter: "blur(20px)",
                            borderRadius: { xs: 3, sm: 4 },
                            p: { xs: 3, sm: 4, md: 5 },
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        <Stack spacing={{ xs: 2, sm: 3 }}>
                            <Box>
                                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                                    🌊 About the Project
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.95)" }}>
                                    Explore satellite images of Earth captured by NASA. View water temperature and marine chlorophyll
                                    data.
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ color: "white", fontWeight: 600, mb: 2 }}>
                                    🎨 Available Layers
                                </Typography>
                                <Stack spacing={2}>
                                    <Paper
                                        sx={{
                                            bgcolor: "rgba(192, 64, 0, 0.3)",
                                            p: 2,
                                            border: "1px solid rgba(192, 64, 0, 0.5)",
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: "white", fontWeight: 600, mb: 0.5 }}>
                                            🌡️ Temperature
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                            Water surface temperature
                                        </Typography>
                                    </Paper>

                                    <Paper
                                        sx={{
                                            bgcolor: "rgba(86, 130, 3, 0.3)",
                                            p: 2,
                                            border: "1px solid rgba(86, 130, 3, 0.5)",
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: "white", fontWeight: 600, mb: 0.5 }}>
                                            🌿 Chlorophyll
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                            Chlorophyll concentration in oceans
                                        </Typography>
                                    </Paper>
                                </Stack>
                            </Box>

                            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.95)", mt: "auto" }}>
                                Data provided by NASA Earth Observing System Data and Information System (EOSDIS)
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>

                {/* Date Message */}
                {dateMessage && (
                    <Paper
                        elevation={8}
                        sx={{
                            position: "fixed",
                            bottom: { xs: 16, sm: 24, md: 32 },
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "linear-gradient(90deg, #C04000, #ff5722)",
                            color: "white",
                            px: { xs: 3, sm: 4, md: 5 },
                            py: { xs: 1.5, sm: 2, md: 2.5 },
                            borderRadius: 3,
                            zIndex: 1000,
                            maxWidth: "90%",
                            textAlign: "center",
                            fontWeight: 500,
                        }}
                    >
                        {dateMessage}
                    </Paper>
                )}
            </Container>

            {/* CSS for shark analysis HTML */}
            <style jsx global>{`
        #analise-tubaroes {
          font-family: system-ui, -apple-system, sans-serif;
        }
        #analise-tubaroes h1 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #568203;
          margin-bottom: 0.5rem;
        }
        #analise-tubaroes h2 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        #alto-risco h2 {
          color: #c04000;
        }
        #medio-risco h2 {
          color: #ff8c00;
        }
        #baixo-risco h2 {
          color: #2196f3;
        }
        #analise-tubaroes ul {
          list-style: none;
          padding-left: 0;
        }
        #analise-tubaroes li {
          margin-bottom: 0.75rem;
          padding-left: 1rem;
          border-left: 3px solid #ddd;
        }
        #alto-risco li {
          border-left-color: #c04000;
        }
        #medio-risco li {
          border-left-color: #ff8c00;
        }
        #baixo-risco li {
          border-left-color: #2196f3;
        }
        .pais {
          font-size: 0.75rem;
          color: #666;
          margin-top: 0.25rem;
        }
        .justificativa {
          font-size: 0.75rem;
          color: #555;
          font-style: italic;
          margin-top: 0.25rem;
        }
        .escopo {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 1rem;
        #previsao-movimento h2 {
          color: #9c27b0;
        }
        #paises-probabilidade h2 {
          color: #568203;
        }
        #conservacao h2 {
          color: #4caf50;
        }
        #confiabilidade h2 {
          color: #ff9800;
        }
        #resumo-detalhado h2 {
          color: #607d8b;
        }
        }
        .nota {
          font-size: 0.75rem;
          color: #666;
        #analise-tubaroes ol {
          padding-left: 1.5rem;
        }
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        #analise-tubaroes ol li {
          border-left: none;
          padding-left: 0;
          margin-bottom: 0.5rem;
        }
      `}</style>
        </Box>
    )
}
