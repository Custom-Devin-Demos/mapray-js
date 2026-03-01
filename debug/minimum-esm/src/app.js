import mapray from "@mapray/mapray-js";
import maprayui from "@mapray/ui";

class App extends maprayui.StandardUIViewer {
    constructor(container, Option = {}) {
        var accessToken = process.env.MAPRAY_ACCESS_TOKEN;
        super(container, accessToken, {
            debug_stats: new mapray.DebugStats(),
            dem_provider: new mapray.FlatDemProvider(),
        });

        const init_camera = {
            longitude: 139.73685,
            latitude: 35.680,
            height: 5000
        };
        const lookat_position = {
            longitude: 139.69685,
            latitude: 35.689777,
            height: 0
        };
        this.setCameraPosition(init_camera);
        this.setLookAtPosition(lookat_position);

        // Add a text entity for Tokyo Tower
        this._addTextEntity();

        // Add pin markers at landmarks
        this._addPinMarkers();

        // Draw route line connecting landmarks
        this._addRouteLine();

        // Update page title
        document.title = "Tokyo Landmarks Tour";
    }

    _addTextEntity() {
        const text_entity = new mapray.TextEntity( this.viewer.scene );
        const text_position = new mapray.GeoPoint( 139.7454, 35.6586, 350 );
        text_entity.addText( "Tokyo Tower", text_position, {} );
        text_entity.setColor( [1, 0.2, 0.2] );
        text_entity.setFontSize( 30 );
        this.viewer.scene.addEntity( text_entity );

        const text_entity2 = new mapray.TextEntity( this.viewer.scene );
        const text_position2 = new mapray.GeoPoint( 139.6917, 35.6895, 250 );
        text_entity2.addText( "Shinjuku", text_position2, {} );
        text_entity2.setColor( [0.2, 0.5, 1.0] );
        text_entity2.setFontSize( 26 );
        this.viewer.scene.addEntity( text_entity2 );

        const text_entity3 = new mapray.TextEntity( this.viewer.scene );
        const text_position3 = new mapray.GeoPoint( 139.7671, 35.6812, 200 );
        text_entity3.addText( "Ginza", text_position3, {} );
        text_entity3.setColor( [0.2, 1.0, 0.4] );
        text_entity3.setFontSize( 26 );
        this.viewer.scene.addEntity( text_entity3 );

        const skytreeText = new mapray.TextEntity( this.viewer.scene );
        const skytreePos = new mapray.GeoPoint( 139.8107, 35.7101, 634 );
        skytreeText.addText( "Tokyo Skytree", skytreePos, {
            color: [1.0, 0.85, 0.0],
            font_size: 28
        });
        this.viewer.scene.addEntity( skytreeText );
    }

    _addPinMarkers() {
        const pins = new mapray.PinEntity( this.viewer.scene );

        // Tokyo Tower
        pins.addPin( new mapray.GeoPoint( 139.745433, 35.658581 ), {
            bg_color: [0.9, 0.2, 0.2]
        });

        // Ginza
        pins.addPin( new mapray.GeoPoint( 139.7649, 35.6717 ), {
            bg_color: [0.9, 0.2, 0.2]
        });

        // Shinjuku
        pins.addPin( new mapray.GeoPoint( 139.699985, 35.690777 ), {
            bg_color: [0.9, 0.2, 0.2]
        });

        // Tokyo Skytree
        pins.addPin( new mapray.GeoPoint( 139.8107, 35.7101 ), {
            bg_color: [0.9, 0.2, 0.2]
        });

        this.viewer.scene.addEntity( pins );
    }

    _addRouteLine() {
        const route = new mapray.MarkerLineEntity( this.viewer.scene );
        route.setColor( [0.9, 0.2, 0.9] );
        route.setLineWidth( 5 );
        const routePoints = [
            139.745433, 35.658581, 0,  // Tokyo Tower
            139.7649,   35.6717,   0,  // Ginza
            139.699985, 35.690777, 0,  // Shinjuku
            139.8107,   35.7101,   0   // Tokyo Skytree
        ];
        route.addPoints( routePoints );
        this.viewer.scene.addEntity( route );
    }
}
export default App;
