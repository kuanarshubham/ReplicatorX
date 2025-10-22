// const { Client } = require('pg');
// const { LogicalReplicationService, PgoutputPlugin } = require('pg-logical-replication');

// const CONN = {
//   host: 'localhost',
//   port: 5432,
//   user: 'repl',
//   password: 'repl',
//   database: 'demo',
// };

// async function ensureSlot(slotName, plugin = 'test_decoding') {
//   const c = new Client({ ...CONN, user: 'postgres', password: 'postgres' });
//   await c.connect();

//   const exists = await c.query(
//     `SELECT 1 FROM pg_replication_slots WHERE slot_name = $1`, [slotName]
//   );

//   if (exists.rowCount === 0) {
//     console.log(`Creating slot "${slotName}" (${plugin})`);
//     const res = await c.query(
//       `SELECT * FROM pg_create_logical_replication_slot($1, $2)`,
//       [slotName, plugin]
//     );
//     console.log('Slot created:', res.rows[0]);
//   } else {
//     console.log(`Slot "${slotName}" already exists.`);
//   }

//   await c.end();
// }

// async function streamSlot(slotName) {
//   const client = new Client({ ...CONN, replication: 'database' });
//   await client.connect();

//   const lr = new LogicalReplicationService(client);

//   const plugin = new PgoutputPlugin({
//     protoVersion: 1,
//     publicationNames: ['demo_pub'],
//   });

//   const stream = await lr.subscribe(plugin, slotName);

//   stream.on('data', async (msg) => {
//     console.log('\n🔄 Change detected');
//     console.log('LSN:', msg.lsn);
//     console.log('Payload:', msg.payload?.toString());
//     await stream.sendStatusUpdate(msg.lsn);
//     console.log('✅ ACK sent for', msg.lsn);
//   });

//   stream.on('error', (err) => console.error('Stream error:', err));
//   stream.on('end', () => console.log('Stream ended.'));
// }


// (async () => {
//   const slot = 'my_slot';
//   await ensureSlot(slot);
//   await streamSlot(slot);
// })();





const { Client } = require('pg');
const { LogicalReplicationService, PgoutputPlugin } = require('pg-logical-replication');

const CONN = {
    host: 'localhost',
    port: 5432,
    user: 'repl',
    password: 'repl',
    database: 'demo',
    replication: 'database'
};

async function ensureSlot(slotName, plugin = 'test_decoding') {
    const c = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'demo'
    });
    await c.connect();

    const exists = await c.query(
        `SELECT 1 FROM pg_replication_slots WHERE slot_name = $1`, [slotName]
    );

    if (exists.rowCount === 0) {
        console.log(`Creating slot "${slotName}" (${plugin})`);
        const res = await c.query(
            `SELECT * FROM pg_create_logical_replication_slot($1, $2)`,
            [slotName, plugin]
        );
        console.log('Slot created:', res.rows[0]);
    } else {
        console.log(`Slot "${slotName}" already exists.`);
    }

    await c.end();
}

async function dropSlot(slotName) {
    const c = new Client({ ...CONN, user: 'postgres', password: 'postgres' });
    await c.connect();
    console.log(`Dropping replication slot "${slotName}" due to error.`);
    await c.query(`SELECT pg_drop_replication_slot($1)`, [slotName]);
    await c.end();
}

async function streamSlot(slotName) {
    const client = new Client({ ...CONN, replication: 'database' });
    await client.connect();

    const lr = new LogicalReplicationService(client);

    const plugin = new PgoutputPlugin({
        protoVersion: 1,
        publicationNames: ['demo_pub'],
    });

    const stream = await lr.subscribe(plugin, slotName);


    stream.on('data', async (msg) => {
        console.log('\n🔄 Change detected');
        console.log('LSN:', msg.lsn);
        console.log('Payload:', msg.payload?.toString());
        await stream.sendStatusUpdate(msg.lsn);
        console.log('✅ ACK sent for', msg.lsn);
    });

    stream.on('error', async (err) => {
        console.error('Stream error:', err);
        await dropSlot(slotName);
        process.exit(1); // Exit after cleanup
    });

    stream.on('end', () => console.log('Stream ended.'));
}

(async () => {
    const slot = 'my_slot';
    try {
        await ensureSlot(slot);
        await streamSlot(slot);
    } catch (err) {
        console.error('Unexpected error:', err);
        await dropSlot(slot);
        process.exit(1);
    }
})();

