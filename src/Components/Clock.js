export function Clock({background,border}) {
    return (
        <div class="clock" style={{background:`${background}`,borderColor:`${border}`}} >
            <div class="top"></div>
            <div class="right"></div>
            <div class="bottom"></div>
            <div class="left"></div>
            <div class="center"></div>
            {/* <div class="shadow"></div> */}
            <div class="hour"></div>
            <div class="minute"></div>
            <div class="second"></div>
        </div>
    )
}
