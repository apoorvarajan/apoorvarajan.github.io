import { execFileSync } from 'node:child_process';

const port = process.env.PORT || '8787';

try {
    const output = execFileSync('lsof', [`-tiTCP:${port}`, '-sTCP:LISTEN'], { encoding: 'utf8' });
    const processIds = output.trim().split(/\s+/).filter(Boolean);

    for (const processId of processIds) {
        let command = '';
        try {
            command = execFileSync('ps', ['-p', processId, '-o', 'command='], { encoding: 'utf8' }).trim();
        } catch {
            continue;
        }

        if (command.includes('node server.mjs')) {
            process.kill(Number(processId), 'SIGTERM');
            console.log(`Stopped previous portfolio backend on port ${port}.`);
        } else {
            console.warn(`Port ${port} is used by another process; leaving it untouched.`);
        }
    }
} catch {
    // No process is listening on the backend port.
}
