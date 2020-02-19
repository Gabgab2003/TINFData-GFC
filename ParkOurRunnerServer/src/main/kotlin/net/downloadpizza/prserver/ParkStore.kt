package net.downloadpizza.prserver

import com.beust.klaxon.JsonParsingException
import net.downloadpizza.prserver.types.*
import java.io.InputStream

import kotlin.math.*

class ParkStore(stream: InputStream) {
    val parks = run {
        val parkFile = klaxon.parse<ParkFile>(stream) ?: throw JsonParsingException("Failed to parse parks")

        if (parkFile.totalFeatures != parkFile.features.size) {
            System.err.println("WARNING: Indicated number of features (${parkFile.totalFeatures} not the same as real number ${parkFile.features.size})")
        }

        parkFile.features
    }

    fun sortedByDistance(coordinates: Coordinates) = parks.map {
        val parkCoords: Coordinates = run {
            val lon = it.geometry.coordinates[0]
            val lat = it.geometry.coordinates[1]
            SimpleCoordinates(lat, lon)
        }

        with(it) {
            ParkWithDist(
                type,
                id,
                geometry,
                geometryName,
                properties,
                distanceBetween(coordinates, parkCoords)
            )
        }
    }.sortedBy(ParkWithDist::distance)

    companion object {
        private fun Double.toRadians() = PI * (this / 180)

        fun distanceBetween(cord1: Coordinates, cord2: Coordinates): Double {
            val (lat1deg, lon1deg) = cord1
            val (lat2deg, lon2deg) = cord2

            val r = 6371e3; // metres
            val lat1 = lat1deg.toRadians()
            val lat2 = lat2deg.toRadians()
            val deltaLat = (lat2deg - lat1deg).toRadians()
            val deltaLon = (lon2deg - lon1deg).toRadians()

            val a = sin(deltaLat / 2).pow(2) +
                    cos(lat1) * cos(lat2) * sin(deltaLon / 2).pow(2)
            val c = 2 * atan2(sqrt(a), sqrt(1 - a))

            return r * c;
        }
    }
}